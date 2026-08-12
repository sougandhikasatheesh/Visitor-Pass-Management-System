const express=require("express");
const rateLimit=require("express-rate-limit");

const{
    signupUser,
    loginUser
}=require("../controllers/userController");

const loginLimiter=rateLimit({
    windowMs:30*1000,
    max:100,
    message:{
        error:"Too many login attempts.plaese try again later"
    }
});

const router=express.Router();
//signup route
router.post("/signup",signupUser);
//login route
router.post("/login",loginUser);

module.exports=router;