const jwt = require('jsonwebtoken');

function authenticationToken(req,res,next){
    try{
        const authHeaders = req.headers.authorization;  // Bearer Token
        const token = authHeaders && authHeaders.split(' ')[1];
        if(token === null){
            return res.status(401).json({status: 'fail', message: "Null token"});
        }
        const user = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err){
                return res.status(401).json({status: 'fail',message: err.message});
            }
            req.user = user;
            next();
        })
    }
    catch(error){
        return res.status(401).json({status: 'fail',message: error.message});
    }
    
}

module.exports = {authenticationToken}