const express = require("express");
const { pool } = require('../dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtTokens, forgetJwtToken } = require('../utils/jwt-helper');
const { authenticationToken } = require('../middleware/authorization');
const mailer = require('../utils/mailer-helper');
const crypto = require("crypto");

const router = express.Router();

function generatePassword() {
    return Array(8)
        .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
        .map(function (x) {
            return x[crypto.randomInt(0, 10000) % x.length];
        })
        .join("");
}

router.post('/register', async (req,res)=>{
    try{
        const errors = [];
        const {email, username, roles, password} = req.body;
        if(!username || !email){
            errors.push({message: 'Please enter all fields!'});
        }
        if(errors.length){
            res.json({status: 'failed', message: errors[0].message});
        }
        else{
            newpassword = password || generatePassword();
            const hashedPassword = await bcrypt.hash(newpassword,10);
            pool.query(
                `INSERT INTO users (email, username, password, roles)
                VALUES ($1, $2, $3, $4) RETURNING id`, [email,username,hashedPassword, roles || 'user'], (err,response)=>{
                    if(err){
                        if(err.message.includes('emailunique')){
                            res.status(400).json({status: 'fail',message:'User already registered'});
                        }
                        else{
                            console.log("Error:",err)
                            res.status(500).json({status: 'fail',message:'Unexpected error occured. Please try again!'});
                        }
                    }
                    else{
                        if(roles === 'admin'){
                            res.status(201).json({status: 'success', message: 'Admin registered successfully'});
                        }
                        else{
                            const id = response.rows[0].id;
                            const token = forgetJwtToken({id,username,email,password: hashedPassword});
                            const link = `${process.env.APPLICATION_HOST}/login/reset-password/?id=${response.rows[0].id}&token=${token}`;
                            var mailOptions = {
                                from: process.env.MAILER_EMAIL,
                                to: email,
                                subject: 'PaisaSanchay: Reset password link',
                                text: `Hi, 
            Admin has created a new user with following credentials:
            email - ${email},
            username - ${username}
            Click on this link and reset your password within 1 hour: 
            ${link}`
                            };
                            
                            mailer.sendMail(mailOptions, function(error, info){
                                if (error) {
                                    console.log(error);
                                res.status(400).json({status:'fail', message: 'Something went wrong. Please try again!'})
                                } else {
                                console.log('Email sent: ' + info.response);
                                res.status(201).json({status: 'success', message: 'User registered successfully and reset email link sent to user'});
                                }
                            })
                        }
                    }
                }
            )
        }
    }
    catch(error){
        return res.status(400).json({status:'fail',message: error.message});
    }
    
})

router.post('/login', async (req,res)=>{
    try{
        const {email, password} = req.body;
        const users = await pool.query(`SELECT * FROM users WHERE email=$1`,[email]);
        console.log("users:",users)
        if(users.rows.length === 0){
            return res.status(401).json({status:'fail',message:'Incorrect email or password'})
        }
        else{
            const validPassword = await bcrypt.compare(password,users.rows[0].password);
            console.log("validPassword:",validPassword)
            if(!validPassword){
                return res.status(401).json({status:'fail',message:'Incorrect email or password'});
            }
            else{
                const token = jwtTokens(users.rows[0]);
                delete users.rows[0].password;
                res.cookie('refresh_token',token.refreshToken, {httpOnly: true});
                return res.status(200).json({status:'success',message:'User authentication successfull', token, user: users.rows[0]});
            }
           
        }
    }
    catch(error){
        return res.status(401).json({status:'fail',message: error.message});
    }
    
})

router.get('/refreshToken',(req,res)=>{
    try {
        const refreshToken = req.cookies.refresh_token;
        if(refreshToken === null){
            return json.status(401).json({status:'fail',message: 'Null refresh token'});
        }
        else{
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
                if(err){
                    return res.status(401).json({status:'fail',message: err.message});
                }
                else{
                    console.log(user)
                    const token = jwtTokens(user);
                    res.cookie('refresh_token',token.refreshToken, {httpOnly: true});
                    return res.status(200).json({status:'success', token});
                }
            })
        }
    } catch (error) {
        return json.status(401).json({status:'fail',message: error.message});
    }
})

router.delete('/refreshToken',(req,res)=>{
    try{
        res.clearCookie('refresh_token');
        res.status(200).json({status:'success',message:'Token cleared'});
    }
    catch(error){
        res.status(400).json({status:'success',message:error.message});
    }
})

router.post('/forgetPassword',async(req,res)=>{
    try {
        const {email} = req.body;
        const users = await pool.query(`SELECT * FROM users WHERE email=$1`,[email]);
        console.log(users.rows);
        if(users.rows.length === 0){
            return res.status(404).json({status:'fail', message:'User not registered'});
        }
        else{
            const token = forgetJwtToken(users.rows[0]);
            console.log(token);
            const link = `${process.env.APPLICATION_HOST}/login/reset-password?id=${users.rows[0].id}&token=${token}`;
            var mailOptions = {
                from: process.env.MAILER_EMAIL,
                to: email,
                subject: 'Sanchay: Reset password link',
                text: `Reset password link: ${link}`
              };
              
              mailer.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                  res.status(400).json({status:'fail', message: 'Something went wrong. Please try again!'})
                } else {
                  console.log('Email sent: ' + info.response);
                  res.status(200).json({status: 200, message: 'Reset email link sent successfully'});
                }
              });
        }
    } catch (error) {
        res.status(400).json({status:'fail',message: error.message});
    }
})

router.post('/resetPassword', async(req,res)=>{
    try {
        const {id, token, password} = req.body;
        const users = await pool.query(`SELECT * FROM users WHERE id=$1`,[parseInt(id)]);
        console.log(users.rows);
        if(users.rows.length){
            const secret = process.env.FORGET_TOKEN_SECRET + users.rows[0].password;
            const payload = jwt.verify(token, secret);
            const hashedPassword = await bcrypt.hash(password,10);
            const updatedUser = await pool.query(`UPDATE users SET password=$1 WHERE email=$2`,[hashedPassword,payload.email]);
            res.status(200).json({status:'success', message: 'Password reset successfully!'});
        }
        else{
            res.status(401).json({status:'fail',message:'Authentication failed. Try again!'});
        }
    } catch (error) {
        res.status(401).json({status:'fail',message:'Authentication failed. Try again!'});
    }
    

})

router.get('/all',authenticationToken,async (req,res)=>{
    try{
        const users = await pool.query(`SELECT id,email,username FROM users`);
        return res.status(200).json({status:'success', users: users.rows})
    }
    catch(error){
        return res.status(400).json({status:'fail', message: error.message})
    }
    
})

router.get('/get/:id',authenticationToken,async (req,res)=>{
    try{
        const id = req.params.id;
        const users = await pool.query(`SELECT id,email,username FROM users WHERE id=$1`,[id]);
        return res.status(200).json({status:'success', users: users.rows})
    }
    catch(error){
        return res.status(400).json({status:'fail', message: error.message})
    }
    
})

router.delete('/delete/:id',authenticationToken, async(req,res)=>{
    try {
        const id = req.params.id;
        const users = await pool.query(`DELETE FROM users WHERE id=$1`,[id]);
        res.status(200).json({'status':'success',message: 'User deleted successfully!'});
    } catch (error) {
        res.status(400).json({'status':'fail',message: 'Unable to delete user!'});
    }
})

router.put('/update', authenticationToken, async(req,res)=>{
    try {
        const {id, email, username} = req.body;
        if(id){
            let query = `UPDATE users SET `;
            let count=0;
            const updateArray=[];
            if(email){
                query+=`email=$1 `;
                count+=1;
                updateArray.push(email);
                if(username){
                    query+=`,username=$2 `;
                    count+=1;
                    updateArray.push(username);
                }
            }
            else if(username){
                query+=`username=$1 `;
                count+=1;
                updateArray.push(username);
            }
            query+=`WHERE id=$${count+1}`;
            updateArray.push(id);
            console.log(query);
            console.log(updateArray);
            const updatedUser = await pool.query(query, updateArray);
            console.log("updatedMember:",updatedUser);
            res.status(200).json({'status':'success',message: 'Member updated successfully!'});
        }
        else{
            res.status(400).json({'status':'fail',message: 'id required!'});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({'status':'fail',message: 'Unable to update!'});
    }
})

module.exports = router;


