const express = require("express");
const { pool } = require('../dbConfig');
const { authenticationToken } = require('../middleware/authorization');

const router = express.Router();

router.post('/add', authenticationToken, async(req,res)=>{
    try {
        const {accountid, remark, amount, transactionDate, userid, type} = req.body;
        let {operation} = req.body;
        if(!accountid || !operation || !amount || !transactionDate || !userid ){
            res.status(400).json({status:'fail',message: 'Please provide required parameters'});
        }
        else{
            if(type){
                operation = operation + ` - ${type}`
            }
            await pool.query(
                `INSERT INTO subscription (accountid, operation, amount, transactionDate, remark, userid)
                VALUES ($1, $2, $3, $4, $5, $6)`, [accountid, operation, amount, transactionDate, remark? remark.substring(0,199):'',userid]);
            const member = await pool.query(`SELECT * FROM members WHERE id=$1`,[accountid]);
            console.log("member:",member);
            smsHelper(amount, 'subscription',operation,member.rows[0].name,member.rows[0].mobile);
            res.status(201).json({status:'success', message:'Subscription added successfully!'});
        }
    } catch (error) {
        res.status(400).json({status:'fail',message: error.message});
    }
});

router.get('/getByOpertion/:operation', authenticationToken, async(req,res)=>{
    try {
        const operation = req.params.operation;
        const subscriptions = await pool.query(`SELECT * FROM subscription WHERE operation=$1`,[operation]);
        res.status(200).json({status:'success', subscriptions: subscriptions.rows})
    } catch (error) {
        res.status(400).json({status:'fail',message: error.message});
    }
})

router.get('/getById/:accountid', authenticationToken, async(req,res)=>{
    try {
        const accountid = req.params.accountid;
        const subscriptions = await pool.query(`SELECT * FROM subscription WHERE id=$1`,[accountid]);
        res.status(200).json({status:'success', subscriptions: subscriptions.rows})
    } catch (error) {
        res.status(400).json({status:'fail',message: error.message});
    }
})

router.get('/getByUserId/:userid', authenticationToken, async(req,res)=>{
    try {
        const userid = req.params.userid;
        const subscriptions = await pool.query(`SELECT * FROM subscription WHERE id=$1`,[userid]);
        res.status(200).json({status:'success', subscriptions: subscriptions.rows})
    } catch (error) {
        res.status(400).json({status:'fail',message: error.message});
    }
})

router.put('/update',authenticationToken, async(req,res)=>{
    try {
        const {voucher_number, accountid, operation, remark, amount, transactionDate, userid} = req.body;
        const columns = Object.keys(req.body);
        const params = [voucher_number];
        let query = "UPDATE subscription SET ";
        for(let i=0; i<columns.length;i++){
            query = `${query}${columns[i]} = $${params.length + 1},`
            params.push(req.body[columns[i]]);
        }
        query = `${query.substring(0, query.length-1)} WHERE id = $1`
        await pool.query(query,params);
        res.status(200).json({status:'success', message: 'Subscription updated successfully!'})
    } catch (error) {
        res.status(400).json({status:'fail',message: error.message});
    }
})

module.exports = router;