const sendSMS=require ("../utils/sendSMS");
const Visitor=require("../models/Visitor");
const CheckLog=require("../models/CheckLog");
const sendEmail=require("../utils/sendEmail");
const QRCode=require("qrcode");
const mongoose=require("mongoose");

//create visitor

const createVisitor=async(req,res)=>{
    try{
        const visitorName=req.body.visitorName;
        const email=req.body.email;
        const phone=req.body.phone;
        const purpose=req.body.purpose;
        const personToMeet=req.body.personToMeet;
        const visitDate=req.body.visitDate;

        if(!visitorName||!email||!phone||!purpose||!personToMeet||!visitDate){
            return res.status(400).json({error:"All fields are required"});
        }
        //if photo is uploaded,get its name 
        let photoName="";
        if(req.file){
            photoName=req.file.filename;
        }
        const visitor=new Visitor({
            visitorName:visitorName,
            email:email,
            phone:phone,
            purpose:purpose,
            personToMeet:personToMeet,
            visitDate:visitDate,
            photo:photoName
        });
        //qr code generation

        const qrText="VISITOR:"+visitor._id;
        const qrImage=await QRCode.toDataURL(qrText);
        visitor.qrCode=qrImage;

        //save visitor

        await visitor.save();
        
        //email

        try{
            await sendEmail(
                email,
                "Visitor Registration Confirmation",
                "hello"+visitorName+",\n\n"+
                "Your visitor registration has been completed\n"+
                "Visitor name"+ visitorName+"\n"+
                "Purpose"+ purpose+"\n"+
                "Person To Meet"+ personToMeet+"\n"+
                "Status:Pending\n"
            );
        }catch(emailError){
            console.log("Email not sent:",emailError.message);
        }

        //sms

        try{
            await sendSMS(phone,"sms_event_notifications");
        }catch(smsError){
            console.log("SMS not sent:",smsError.message);
        }
        res.status(201).json(visitor);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

//get all visitors

const getVisitors=async(req,res)=>{
    try{
        const visitors=await Visitor.find().sort({createdAt:-1});
        res.status(200).json(visitors);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

//get single visitor

const getVisitor=async(req,res)=>{
    try{
        const visitor=await Visitor.findById(req.params.id);
        if(!visitor){
            return res.status(404).json({error:"visitor not found"});
        }
        res.json(visitor);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

//update visitor

const updateVisitor=async(req,res)=>{
    try{
        const visitor=await Visitor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!visitor){
            return res.status(404).json({error:"visitor not found"});
        }
        res.status(200).json(visitor);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};


//delete visitor

const deleteVisitor=async(req,res)=>{
    try{
        const visitor=await Visitor.findByIdAndDelete(req.params.id);
        if(!visitor){
            return res.status(404).json({error:"visitor not found"});
        }
        res.status(200).json({message:"Visitor deleted successfully"});
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

//checkin & checkout

const checkVisitor=async(req,res)=>{
    try{
        const visitorId=req.params.id;
        if(!visitor){
            return res.status(400).json({error:"Visitor id is required"});
        }
        if(!mongoose.Types.ObjectId.isValid(visitorId)){
            return res.status(400).json({error:"Invalid visitor Id"});
        }
        const visitor=await Visitor.findById(visitorId);
        if(!visitor){
            return res.status(404).json({error:"Visitor not found"});
        }
        let action="";
        if(visitor.status==="Not Checked In"){
            visitor.status="Checked In";
            action="Check-In";
        }else if(visitor.status==="Checked In"){
            visitor.status="Checkout Out";
            action="Check-Out";
        }else{
            return res.status(400).json({error:"Visitor has already checked out"});
        }
        await visitor.save();

        //log for check in out
        await CheckLog.create({
            visitor:visitor._id,
            visitorName:visitor.visitorName,
            action:action,
            checkedBy:req.user.name
        });
        res.status(200).json(visitor);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

module.exports={
    createVisitor,
    getVisitors,
    getVisitor,
    updateVisitor,
    deleteVisitor,
    checkVisitor
};

