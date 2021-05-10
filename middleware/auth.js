const jwt= require('jsonwebtoken');
require("dotenv").config();

const auth = (req,res,next)=>{
try {
    const token = req.header("x-auth-token")
    if(!token){
       return res,status(403).json({msg:"no authentication token pass"})
    }
    const verified= jwt.verify(token,process.env.JWT_SECRET);
    if(!verified){
        return res,status(403).json({msg:"not verified"})  
    }
    req.user=verified.id;
    next();
} catch (err) {}
}
module.exports=auth;