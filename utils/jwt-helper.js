const jwt = require('jsonwebtoken');

function jwtTokens({id,username,email,roles}) {
    console.log(id,username,email,roles);
    const user = {id,username,email,roles};
    console.log("user:",user)
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
    console.log(accessToken)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '14d'});
    console.log(refreshToken)
    // real life accesstoken = 20m and refreshtoken = 14 days
    return {accessToken, refreshToken};

}

function forgetJwtToken({id,username,email,password}){
    const user = {id,username,email,password};
    const forgetToken = jwt.sign(user, process.env.FORGET_TOKEN_SECRET+password, {expiresIn: '60m'});
    return forgetToken;
}

module.exports = {jwtTokens, forgetJwtToken};