const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.headers)
    console.log(req.body)
    const token = req.headers.authorization.split(" ")[1];
    
    
    if(!token){
        return res.sendStatus(401).json({message:"no token was found"})
    } else{
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,username)=>{
            if(error){
                return res.sendStatus(403).json({message:"token found but it expired or incorrect"})
            }else{
                req.user = username;
                next();
            }
        })
    }
};