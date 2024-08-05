const jwt = require('jsonwebtoken')
const secret = 'shhhhh'

const fetchUser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error : " Please authenticate using valid credentials"});
    }
    try{
        const data = jwt.verify(token,secret);
        req.user = data;
        next();

    }catch(error){
        return res.status(401).send({error : "User not found"});
    }
}

module.exports = fetchUser;