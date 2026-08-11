const jwt=require('jsonwebtoken');
const User=require('../models/User');

const requireAuth=async(req,res,next)=>{
    try{
        const authorization =req.headers.authorization;

        if(!authorization){
        return res.status(401).json({error:'Authorization token required'});
        }
        
        const token=authorization.split(' ')[1];
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decodedToken._id);
        if(!user){
            return res.status(401).json({
                error:"User not found"
            })
        }
        req.user=user;
        next();
        }catch(error){
            return res.status(401).json({
                error:"Request is not authorized"
            })
        }
}; 
module.exports=requireAuth;