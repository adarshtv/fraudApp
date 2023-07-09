const express = require("express");
const { pool } = require('../dbConfig');
const { authenticationToken } = require('../middleware/authorization');

const router = express.Router();
const Excel = require("exceljs");

router.get('/all', authenticationToken, async(req,res)=>{
    try {
        console.log("req.query:",req.query);
        if(req.query.userid === 'All'){
            delete req.query.userid;
        }
        if(req.query.operation === 'All'){
            delete req.query.operation;
        }
        //const {fromDate, toDate, operation, collectionMode, userid} = req.query;
        if(req.query.collectionMode === 'loan'){
            delete req.query.collectionMode;
            console.log("req.query:",req.query);
            const columns = Object.keys(req.query);
            console.log("columns:",columns);
            const params = [];
            let query = "SELECT l.voucher_number, u.username AS user, l.operation, l.amount, m.name AS member, m.cardnumber, l.transactionDate FROM loans l INNER JOIN users u ON l.userid = u.id INNER JOIN members m ON l.accountid = m.id  WHERE ";
            for(let i=0; i<columns.length;i++){
                if(columns[i] === 'fromDate'){
                    query = `${query}transactionDate >= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(columns[i] === 'toDate'){
                    query = `${query}transactionDate <= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(req.query[columns[i]] === 'Opening balance'){
                    query = `${query}${columns[i]} LIKE $${params.length + 1} AND `
                    params.push(`%${req.query[columns[i]]}%`);
                }
                else{
                    const input = req.query[columns[i]].split(',');
                    if(input.length===1){
                        query = `${query}${columns[i]} = $${params.length + 1} AND `
                        params.push(req.query[columns[i]]);
                    }
                    else if(input.length>1){
                        const paramsTemp = [];
                        for(let j = params.length+1; j <= input.length+params.length; j++) {
                            paramsTemp.push('$' + j);
                        }
                        query = `${query}${columns[i]} IN ( ${paramsTemp.join(',')} ) AND `;
                        params.push(...input);
                        console.log("params:",params)
                        console.log("query:",query);
                    }
                    
                }   
            }
            query = query.substring(0, query.length-4);
            console.log("query:",query)
            console.log("params:",params)
            const results = await pool.query(query,params);
            console.log("results:",results)
            results.rows.map(res=> res.collectionmode = 'loan');
            res.status(200).json({status:'success', result: results.rows})
        }
        else if(req.query.collectionMode === 'mdtwf'){
            delete req.query.collectionMode;
            const columns = Object.keys(req.query);
            const params = [];
            let query = "SELECT m1.voucher_number, u.username AS user, m1.operation, m1.amount, m2.name AS member, m2.cardnumber, m1.transactionDate FROM mdtwf m1 INNER JOIN users u ON m1.userid = u.id INNER JOIN members m2 ON m1.accountid = m2.id  WHERE "
            for(let i=0; i<columns.length;i++){
                if(columns[i] === 'fromDate'){
                    query = `${query}transactionDate >= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(columns[i] === 'toDate'){
                    query = `${query}transactionDate <= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(req.query[columns[i]] === 'Opening balance'){
                    query = `${query}${columns[i]} LIKE $${params.length + 1} AND `
                    params.push(`%${req.query[columns[i]]}%`);
                }
                else{
                    const input = req.query[columns[i]].split(',');
                    if(input.length===1){
                        query = `${query}${columns[i]} = $${params.length + 1} AND `
                        params.push(req.query[columns[i]]);
                    }
                    else if(input.length>1){
                        const paramsTemp = [];
                        for(let j = params.length+1; j <= input.length+params.length; j++) {
                            paramsTemp.push('$' + j);
                        }
                        query = `${query}${columns[i]} IN ( ${paramsTemp.join(',')} ) AND `;
                        params.push(...input);
                        console.log("params:",params)
                        console.log("query:",query);
                    }
                    
                }
            }
            query = query.substring(0, query.length-4);
            console.log("query:",query)
            const results = await pool.query(query,params);
            results.rows.map(res=> res.collectionmode = 'mdtwf');
            res.status(200).json({status:'success', result: results.rows})
        }
        else if(req.query.collectionMode === 'subscription'){
            delete req.query.collectionMode;
            const columns = Object.keys(req.query);
            const params = [];
            let query = "SELECT s.voucher_number, u.username AS user, s.operation, s.amount, m2.name AS member, m2.cardnumber, s.transactionDate FROM subscription s INNER JOIN users u ON s.userid = u.id INNER JOIN members m2 ON s.accountid = m2.id  WHERE ";
            for(let i=0; i<columns.length;i++){
                if(columns[i] === 'fromDate'){
                    query = `${query}transactionDate >= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(columns[i] === 'toDate'){
                    query = `${query}transactionDate <= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(req.query[columns[i]] === 'Opening balance'){
                    query = `${query}${columns[i]} LIKE $${params.length + 1} AND `
                    params.push(`%${req.query[columns[i]]}%`);
                }
                else{
                    const input = req.query[columns[i]].split(',');
                    if(input.length===1){
                        query = `${query}${columns[i]} = $${params.length + 1} AND `
                        params.push(req.query[columns[i]]);
                    }
                    else if(input.length>1){
                        const paramsTemp = [];
                        for(let j = params.length+1; j <= input.length+params.length; j++) {
                            paramsTemp.push('$' + j);
                        }
                        query = `${query}${columns[i]} IN ( ${paramsTemp.join(',')} ) AND `;
                        params.push(...input);
                        console.log("params:",params)
                        console.log("query:",query);
                    }
                    
                }
            }
            query = query.substring(0, query.length-4);
            console.log("query:",query)
            const results = await pool.query(query,params);
            results.rows.map(res=> res.collectionmode = 'subscription');
            res.status(200).json({status:'success', result: results.rows})
        }
        else if(req.query.collectionMode === 'kuri'){
            delete req.query.collectionMode;
            const columns = Object.keys(req.query);
            const params = [];
            let query = "SELECT k.voucher_number, u.username AS user, k.operation, k.amount, m2.name AS member, m2.cardnumber, k.transactionDate FROM kuri k INNER JOIN users u ON k.userid = u.id INNER JOIN members m2 ON k.accountid = m2.id  WHERE ";
            for(let i=0; i<columns.length;i++){
                if(columns[i] === 'fromDate'){
                    query = `${query}transactionDate >= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(columns[i] === 'toDate'){
                    query = `${query}transactionDate <= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(req.query[columns[i]] === 'Opening balance'){
                    query = `${query}${columns[i]} LIKE $${params.length + 1} AND `
                    params.push(`%${req.query[columns[i]]}%`);
                }
                else{
                    const input = req.query[columns[i]].split(',');
                    if(input.length===1){
                        query = `${query}${columns[i]} = $${params.length + 1} AND `
                        params.push(req.query[columns[i]]);
                    }
                    else if(input.length>1){
                        const paramsTemp = [];
                        for(let j = params.length+1; j <= input.length+params.length; j++) {
                            paramsTemp.push('$' + j);
                        }
                        query = `${query}${columns[i]} IN ( ${paramsTemp.join(',')} ) AND `;
                        params.push(...input);
                        console.log("params:",params)
                        console.log("query:",query);
                    }
                    
                }
            }
            query = query.substring(0, query.length-4);
            console.log("query:",query)
            const results = await pool.query(query,params);
            results.rows.map(res=> res.collectionmode = 'kuri');
            res.status(200).json({status:'success', result: results.rows})
        }
        else{
            //delete req.query.collectionMode;
            //const collectionModes = ['loans','subscription','kuri','mdtwf'];
            const columns = Object.keys(req.query);
            const params = [];
            const results = [];
            let query = " ";
            for(let i=0; i<columns.length;i++){
                if(columns[i] === 'fromDate'){
                    query = `${query}transactionDate >= $${params.length + 1} AND `;
                    params.push(req.query[columns[i]]);
                }
                else if(columns[i] === 'toDate'){
                    query = `${query}transactionDate <= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                // else if(req.query[columns[i]] === 'Opening balance'){
                //     query = `${query}${columns[i]} LIKE $${params.length + 1} AND `
                //     params.push(`%${req.query[columns[i]]}%`);
                // }
                else{
                    const input = req.query[columns[i]].split(',');
                    if(input.length===1){
                        query = `${query}${columns[i]} = $${params.length + 1} AND `
                        params.push(req.query[columns[i]]);
                    }
                    else if(input.length>1){
                        const paramsTemp = [];
                        for(let j = params.length+1; j <= input.length+params.length; j++) {
                            paramsTemp.push('$' + j);
                        }
                        query = `${query}${columns[i]} IN ( ${paramsTemp.join(',')} ) AND `;
                        params.push(...input);
                        console.log("params:",params)
                        console.log("query:",query);
                    }
                    
                }
            }
            query = query.substring(0, query.length-4);
            //const collectionMapping = {'loans':'loan','subscription':'subscription','mdtwf':'mdtwf','kuri':'kuri'}
            // const promises = [];
            // for(let coll in collectionModes){
            //     promises.push(new Promise(async resolve => {
            //         const fullQuery = `SELECT m1.voucher_number, u.username AS user, m1.operation, m1.amount, m2.name AS member, m2.cardnumber, m1.transactionDate FROM ${collectionModes[coll]} m1 INNER JOIN users u ON m1.userid = u.id INNER JOIN members m2 ON m1.accountid = m2.id WHERE `+query;
            //         console.log("fullQuery:",fullQuery)
            //         console.log("params:",params)
            //         const result = await pool.query(fullQuery,params);
            //         result.rows.map(res=> res.collectionmode = collectionMapping[collectionModes[coll]]);
            //         results.push(...result.rows);
            //         resolve(result.rows);
            //     }))
            // }
            const fullQuery = `SELECT m1.id, u.username AS user, m1.operation, m1.amount, m2.name AS member, m2.id as memberId, m1.transactiondate FROM transactions m1 INNER JOIN users u ON m1.userid = u.id INNER JOIN members m2 ON m1.accountid = m2.id WHERE `+query;
            const result = await pool.query(fullQuery,params);
            results.push(...result.rows);
                //console.log("results:",results);
                results.sort((x, y) => {
                    console.log("x.transactionDate:",x.transactiondate)
                    console.log("y.transactionDate:",y.transactiondate)
                    x = new Date(x.transactiondate),
                     y = new Date(y.transactiondate);
                     console.log("x:",x);
                     console.log("y:",y);
                   return x - y;
               });
               const creditTransactions = ['Receipt','Opening balance - credit'];
               const debitTransactions = ['Payment','Opening balance - debit'];
               const totalBalance = results.reduce((acc,curr)=>{
                if(creditTransactions.includes(curr.operation)){
                    acc.credit += parseInt(curr.amount);
                }
                else{
                    acc.debit += parseInt(curr.amount);
                }
                return acc;
               },{credit:0,debit:0});
               console.log("totalBalance:",totalBalance);
               //console.log("results:",results);
                res.status(200).json({status:'success', result: {results, totalBalance}})
            
            
        }
        
    } catch (error) {
        console.log("error:",error)
        res.status(400).json({status:'fail',message: error});
    }
})
router.get('/download', authenticationToken, async(req,res)=>{
    try {
        console.log("req.query:",req.query);
        if(req.query.userid === 'All'){
            delete req.query.userid;
        }
        if(req.query.operation === 'All'){
            delete req.query.operation;
        }
        //const {fromDate, toDate, operation, collectionMode, userid} = req.query;
        if(req.query.collectionMode === 'loan'){
            delete req.query.collectionMode;
            console.log("req.query:",req.query);
            const columns = Object.keys(req.query);
            console.log("columns:",columns);
            const params = [];
            let query = "SELECT l.voucher_number, u.username AS user, l.operation, l.amount, m.name AS member, m.cardnumber, l.transactionDate FROM loans l INNER JOIN users u ON l.userid = u.id INNER JOIN members m ON l.accountid = m.id  WHERE ";
            for(let i=0; i<columns.length;i++){
                if(columns[i] === 'fromDate'){
                    query = `${query}transactionDate >= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(columns[i] === 'toDate'){
                    query = `${query}transactionDate <= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(req.query[columns[i]] === 'Opening balance'){
                    query = `${query}${columns[i]} LIKE $${params.length + 1} AND `
                    params.push(`%${req.query[columns[i]]}%`);
                }
                else{
                    const input = req.query[columns[i]].split(',');
                    if(input.length===1){
                        query = `${query}${columns[i]} = $${params.length + 1} AND `
                        params.push(req.query[columns[i]]);
                    }
                    else if(input.length>1){
                        const paramsTemp = [];
                        for(let j = params.length+1; j <= input.length+params.length; j++) {
                            paramsTemp.push('$' + j);
                        }
                        query = `${query}${columns[i]} IN ( ${paramsTemp.join(',')} ) AND `;
                        params.push(...input);
                        console.log("params:",params)
                        console.log("query:",query);
                    }
                    
                }   
            }
            query = query.substring(0, query.length-4);
            console.log("query:",query)
            console.log("params:",params)
            const results = await pool.query(query,params);
            console.log("results:",results)
            results.rows.map(res=> res.collectionmode = 'loan');
            res.status(200).json({status:'success', result: results.rows})
        }
        else if(req.query.collectionMode === 'mdtwf'){
            delete req.query.collectionMode;
            const columns = Object.keys(req.query);
            const params = [];
            let query = "SELECT m1.voucher_number, u.username AS user, m1.operation, m1.amount, m2.name AS member, m2.cardnumber, m1.transactionDate FROM mdtwf m1 INNER JOIN users u ON m1.userid = u.id INNER JOIN members m2 ON m1.accountid = m2.id  WHERE "
            for(let i=0; i<columns.length;i++){
                if(columns[i] === 'fromDate'){
                    query = `${query}transactionDate >= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(columns[i] === 'toDate'){
                    query = `${query}transactionDate <= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(req.query[columns[i]] === 'Opening balance'){
                    query = `${query}${columns[i]} LIKE $${params.length + 1} AND `
                    params.push(`%${req.query[columns[i]]}%`);
                }
                else{
                    const input = req.query[columns[i]].split(',');
                    if(input.length===1){
                        query = `${query}${columns[i]} = $${params.length + 1} AND `
                        params.push(req.query[columns[i]]);
                    }
                    else if(input.length>1){
                        const paramsTemp = [];
                        for(let j = params.length+1; j <= input.length+params.length; j++) {
                            paramsTemp.push('$' + j);
                        }
                        query = `${query}${columns[i]} IN ( ${paramsTemp.join(',')} ) AND `;
                        params.push(...input);
                        console.log("params:",params)
                        console.log("query:",query);
                    }
                    
                }
            }
            query = query.substring(0, query.length-4);
            console.log("query:",query)
            const results = await pool.query(query,params);
            results.rows.map(res=> res.collectionmode = 'mdtwf');
            res.status(200).json({status:'success', result: results.rows})
        }
        else if(req.query.collectionMode === 'subscription'){
            delete req.query.collectionMode;
            const columns = Object.keys(req.query);
            const params = [];
            let query = "SELECT s.voucher_number, u.username AS user, s.operation, s.amount, m2.name AS member, m2.cardnumber, s.transactionDate FROM subscription s INNER JOIN users u ON s.userid = u.id INNER JOIN members m2 ON s.accountid = m2.id  WHERE ";
            for(let i=0; i<columns.length;i++){
                if(columns[i] === 'fromDate'){
                    query = `${query}transactionDate >= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(columns[i] === 'toDate'){
                    query = `${query}transactionDate <= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(req.query[columns[i]] === 'Opening balance'){
                    query = `${query}${columns[i]} LIKE $${params.length + 1} AND `
                    params.push(`%${req.query[columns[i]]}%`);
                }
                else{
                    const input = req.query[columns[i]].split(',');
                    if(input.length===1){
                        query = `${query}${columns[i]} = $${params.length + 1} AND `
                        params.push(req.query[columns[i]]);
                    }
                    else if(input.length>1){
                        const paramsTemp = [];
                        for(let j = params.length+1; j <= input.length+params.length; j++) {
                            paramsTemp.push('$' + j);
                        }
                        query = `${query}${columns[i]} IN ( ${paramsTemp.join(',')} ) AND `;
                        params.push(...input);
                        console.log("params:",params)
                        console.log("query:",query);
                    }
                    
                }
            }
            query = query.substring(0, query.length-4);
            console.log("query:",query)
            const results = await pool.query(query,params);
            results.rows.map(res=> res.collectionmode = 'subscription');
            res.status(200).json({status:'success', result: results.rows})
        }
        else if(req.query.collectionMode === 'kuri'){
            delete req.query.collectionMode;
            const columns = Object.keys(req.query);
            const params = [];
            let query = "SELECT k.voucher_number, u.username AS user, k.operation, k.amount, m2.name AS member, m2.cardnumber, k.transactionDate FROM kuri k INNER JOIN users u ON k.userid = u.id INNER JOIN members m2 ON k.accountid = m2.id  WHERE ";
            for(let i=0; i<columns.length;i++){
                if(columns[i] === 'fromDate'){
                    query = `${query}transactionDate >= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(columns[i] === 'toDate'){
                    query = `${query}transactionDate <= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(req.query[columns[i]] === 'Opening balance'){
                    query = `${query}${columns[i]} LIKE $${params.length + 1} AND `
                    params.push(`%${req.query[columns[i]]}%`);
                }
                else{
                    const input = req.query[columns[i]].split(',');
                    if(input.length===1){
                        query = `${query}${columns[i]} = $${params.length + 1} AND `
                        params.push(req.query[columns[i]]);
                    }
                    else if(input.length>1){
                        const paramsTemp = [];
                        for(let j = params.length+1; j <= input.length+params.length; j++) {
                            paramsTemp.push('$' + j);
                        }
                        query = `${query}${columns[i]} IN ( ${paramsTemp.join(',')} ) AND `;
                        params.push(...input);
                        console.log("params:",params)
                        console.log("query:",query);
                    }
                    
                }
            }
            query = query.substring(0, query.length-4);
            console.log("query:",query)
            const results = await pool.query(query,params);
            results.rows.map(res=> res.collectionmode = 'kuri');
            res.status(200).json({status:'success', result: results.rows})
        }
        else{
            delete req.query.collectionMode;
            const collectionModes = ['loans','subscription','kuri','mdtwf'];
            const columns = Object.keys(req.query);
            const params = [];
            const results = [];
            let query = " ";
            for(let i=0; i<columns.length;i++){
                if(columns[i] === 'fromDate'){
                    query = `${query}transactionDate >= $${params.length + 1} AND `;
                    params.push(req.query[columns[i]]);
                }
                else if(columns[i] === 'toDate'){
                    query = `${query}transactionDate <= $${params.length + 1} AND `
                    params.push(req.query[columns[i]]);
                }
                else if(req.query[columns[i]] === 'Opening balance'){
                    query = `${query}${columns[i]} LIKE $${params.length + 1} AND `
                    params.push(`%${req.query[columns[i]]}%`);
                }
                else{
                    const input = req.query[columns[i]].split(',');
                    if(input.length===1){
                        query = `${query}${columns[i]} = $${params.length + 1} AND `
                        params.push(req.query[columns[i]]);
                    }
                    else if(input.length>1){
                        const paramsTemp = [];
                        for(let j = params.length+1; j <= input.length+params.length; j++) {
                            paramsTemp.push('$' + j);
                        }
                        query = `${query}${columns[i]} IN ( ${paramsTemp.join(',')} ) AND `;
                        params.push(...input);
                        console.log("params:",params)
                        console.log("query:",query);
                    }
                    
                }
            }
            query = query.substring(0, query.length-4);
            const collectionMapping = {'loans':'loan','subscription':'subscription','mdtwf':'mdtwf','kuri':'kuri'}
            const promises = [];
            for(let coll in collectionModes){
                promises.push(new Promise(async resolve => {
                    const fullQuery = `SELECT m1.voucher_number, u.username AS user, m1.operation, m1.amount, m2.name AS member, m2.cardnumber, m1.transactionDate FROM ${collectionModes[coll]} m1 INNER JOIN users u ON m1.userid = u.id INNER JOIN members m2 ON m1.accountid = m2.id WHERE `+query;
                    console.log("fullQuery:",fullQuery)
                    console.log("params:",params)
                    const result = await pool.query(fullQuery,params);
                    result.rows.map(res=> res.collectionmode = collectionMapping[collectionModes[coll]]);
                    results.push(...result.rows);
                    resolve(result.rows);
                }))
            }

            Promise.all(promises)
                .then(result => {
                //console.log("results:",results);
                results.sort((x, y) => {
                    console.log("x.transactionDate:",x.transactionDate)
                    console.log("y.transactionDate:",y.transactionDate)
                    x = new Date(x.transactionDate),
                     y = new Date(y.transactionDate);
                     console.log("x:",x);
                     console.log("y:",y);
                   return x - y;
               });
               try {
                   var workbook = new Excel.Workbook();
                   var worksheet = workbook.addWorksheet('My Sheet');
           
                   worksheet.columns = [
                       { header: 'Voucher Number', key: 'voucher_number', width: 30 },
                       { header: 'Card Number', key: 'cardnumber', width: 10 },
                       { header: 'Member Name', key: 'member', width: 10 },
                       { header: 'User Name', key: 'user', width: 10 },
                       { header: 'Amount', key: 'amount', width: 10 },
                       { header: 'Date', key: 'transactiondate', width: 10 },
                       { header: 'Operation', key: 'operation', width: 10 },
                       { header: 'Collection Mode', key: 'collectionmode', width: 10 }
                   ];
                   results.forEach(row => {
                        worksheet.addRow(row);
                   })
                   // worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});
                   // worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)});
                   var tempFilePath = tempfile('.xlsx');
                   workbook.xlsx.writeFile(tempFilePath).then((file) => {
                    res.download(file);
                    //    console.log('file is written');
                    //    res.sendFile(tempFilePath, function(err){
                    //        console.log('---------- error downloading file: ' + err);
                    //    });
                   });
               } catch(err) {
                   console.log('OOOOOOO this is the error: ' + err);
               }
               
            })
            
        }
        
    } catch (error) {
        console.log("error:",error)
        res.status(400).json({status:'fail',message: error});
    }
})


module.exports = router;