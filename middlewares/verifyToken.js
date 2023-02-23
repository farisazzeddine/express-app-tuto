const jwt = require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config();
// Verify Token
function verifyToken(req,res,next) {
   const token = req.headers.token;
   if (token){
        try{
          const decoded =  jwt.verify(token,process.env.JWT_SECRET_KEY);
          req.user = decoded;
          next();
        }
        catch (e) {
            res.status(401).json({message:"invalid token"})
        }
   }else{
       res.status(401).json({message:"no token provided"})
   }
}
//verify token & Authorize the user
function  verifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
           next()
        }
        else{
            //forbidden
            return res.status(403).json({message:"You are not allowed, you only can update your profile"})
        }
    })
}
//verify token & Admin
function  verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
           next()
        }
        else{
            //forbidden
            return res.status(403).json({message:"You are not allowed, only Admin"})
        }
    })
}
module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}