const express = require("express");
const { pool } = require('../dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtTokens, forgetJwtToken } = require('../utils/jwt-helper');
const { authenticationToken } = require('../middleware/authorization');

const router = express.Router();


router.post('/add',authenticationToken, async(req,res)=>{
    try {
        const {name, cardnumber, shopname, mobile} = req.body;
        if(!name || !cardnumber || !shopname || !mobile){
            res.status(400).json({'status':'fail',message: 'Please enter all fields!'})
        }
        else{
            const member = await pool.query(
                `INSERT INTO members (name, cardnumber, shopname, mobile)
                VALUES ($1, $2, $3, $4)`, [name,cardnumber,shopname, mobile]);
            res.status(201).json({status:'success', message: 'Member added successfully!'})
        }
    } catch (error) {
        if(error.message.includes('uniquecard')){
            res.status(400).json({'status':'fail',message: 'Card member already added!'});
        }
        else{
            res.status(400).json({'status':'fail',message: 'Unexpected error occured. Please try again!'})
        }
    }
})

router.put('/update',authenticationToken, async(req,res)=>{
    try {
        const {id, name, cardnumber, shopname, mobile} = req.body;
        if(id){
            let query = `UPDATE members SET `;
            let count=0;
            const updateArray=[];
            if(name){
                query+=`name=$1 `;
                count+=1;
                updateArray.push(name);
                if(shopname){
                    query+=`,shopname=$2 `;
                    count+=1;
                    updateArray.push(shopname);
                    if(mobile){
                        query+=`,mobile=$3 `;
                        count+=1;
                        updateArray.push(mobile);
                        if(cardnumber){
                            query+=`,cardnumber=$4 `;
                            count+=1;
                            updateArray.push(cardnumber);
                        }
                    }
                    else if(cardnumber){
                        query+=`,cardnumber=$3 `;
                        count+=1;
                        updateArray.push(cardnumber);
                    }
                }
                else if(mobile){
                    query+=`,mobile=$2 `;
                    count+=1;
                    updateArray.push(mobile)
                    if(cardnumber){
                        query+=`,cardnumber=$3 `;
                        count+=1;
                        updateArray.push(cardnumber);
                    }
                }
                else if(cardnumber){
                    query+=`,cardnumber=$2 `;
                    count+=1;
                    updateArray.push(cardnumber);
                }
            }
            else if(shopname){
                query+=`shopname=$1 `;
                count+=1;
                updateArray.push(shopname);
                if(mobile){
                    query+=`,mobile=$2 `;
                    count+=1;
                    updateArray.push(mobile);
                    if(cardnumber){
                        query+=`,cardnumber=$3 `;
                        count+=1;
                        updateArray.push(cardnumber);
                    }
                }
                else if(cardnumber){
                    query+=`,cardnumber=$2 `;
                    count+=1;
                    updateArray.push(cardnumber);
                }
            }
            else if(mobile){
                query+=`mobile=$1 `
                count+=1;
                updateArray.push(mobile);
                if(cardnumber){
                    query+=`,cardnumber=$2 `;
                    count+=1;
                    updateArray.push(cardnumber);
                }
            }
            else if(cardnumber){
                query+=`,cardnumber=$1 `;
                count+=1;
                updateArray.push(cardnumber);
            }
            query+=`WHERE id=$${count+1}`;
            updateArray.push(id);
            console.log(query);
            console.log(updateArray);
            const updatedMember = await pool.query(query, updateArray);
            console.log("updatedMember:",updatedMember);
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

router.delete('/delete/:id',authenticationToken, async(req,res)=>{
    try {
        const id = req.params.id;
        const users = await pool.query(`DELETE FROM members WHERE id=$1`,[id]);
        res.status(200).json({'status':'success',message: 'Member deleted successfully!'});
    } catch (error) {
        res.status(400).json({'status':'fail',message: 'Unable to delete!'});
    }
})

router.get('/all',authenticationToken, async(req,res)=>{
    try {
        const members = await pool.query(`SELECT * FROM members`);
        res.status(200).json({status:'success', members: members.rows})
    } catch (error) {
        res.status(400).json({status:'fail',message: error.message});
    }
})

router.get('/get/:id', authenticationToken, async(req,res)=>{
    try {
        const id = req.params.id;
        const members = await pool.query(`SELECT * FROM members WHERE id=$1`,[id]);
        res.status(200).json({'status':'success',member: members.rows});
    } catch (error) {
        res.status(400).json({'status':'fail',message: 'Unable to get member!'});
    }
})

module.exports = router;