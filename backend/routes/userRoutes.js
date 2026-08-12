const express=require("express");
const rateLimit=require("express-rate-limit");

const{
    signupUser,
    loginUser
}=require("../controllers/userController");

const loginLimiter=rateLimit({
    windowMs:15*60*1000,
    max:5,
    message:{
        error:"Too many login attempts.plaese try again later"
    }
});

const router=express.Router();
//signup route
router.post("/signup",signupUser);
//login route
router.post("/login",loginLimiter,loginUser);

module.exports=router;