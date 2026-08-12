const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.JWT_SECRET,{expiresIn:'1d'});
};

const signupUser=async(req,res)=>{
    const {name,email,password,role}=req.body;
    try{
        const exists=await User.findOne({email});
        if(exists){
            return res.status(400).json({error:"Email already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(password,salt);

        //create user

        const user=await User.create({
            name,email,password:hash,role
        });

        //create token
        const token=createToken(user._id);
        res.status(200).json({name:user.name,email:user.email,role:user.role,token});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

//login user
const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid email or password"});
        }
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({error:"Invalid email or password"});
        }
        const token=createToken(user._id);
        res.status(200).json({name:user.name,email:user.email,role:user.role,token});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};
module.exports={signupUser,loginUser};