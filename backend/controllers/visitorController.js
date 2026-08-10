const sendSMS=require("../utils/sendSMS");
const Visitor=require('../models/Visitor');
const CheckLog = require("../models/CheckLog");
const sendEmail = require("../utils/sendEmail");
const QRCode = require("qrcode");

//create visitor
const createVisitor=async(req,res)=>{
    try{
        const {
            visitorName,
            email,
            phone,
            purpose,
            personToMeet,
            visitDate
            } = req.body;
            if(!visitorName||!email||!phone||!purpose||!personToMeet||!visitDate){
                return res.status(400).json({
                    error:"All fields are required"
                });
            }

//create visitor object

        const visitor = new Visitor({
            visitorName,
            email,
            phone,
            purpose,
            personToMeet,
            visitDate,
            photo: req.file ? req.file.filename : ""
            });

            //qr code

            const qrText = `VISITOR:${visitor._id}`;
            visitor.qrCode = await QRCode.toDataURL(qrText);

            //saving to mongoDB
            await visitor.save();


            //email
            try{
                await sendEmail(
                    email,
                    "Visitor Registration Confirmation",
                    `Hello ${visitorName},

                Your visitor registration has been completed successfully.

                Visitor Name: ${visitorName}
                Purpose: ${purpose}
                Person To Meet: ${personToMeet}
                Visit Date: ${visitDate}
                Status: Pending

                Thank you for using the Visitor Pass Management System.`
                );
            }catch(emailError){
                console.log("Email not sent :",emailError.message);
            }
            try{
                await sendSMS(
                    phone,
                    "sms_event_notifications"
                );
            }catch(smsError){
                console.log("SMS not sent:",smsError.message);
            }
            res.status(201).json(visitor);
        }catch(error){
            res.status(400).json({
                message:error.message
            })
        }
    };
            

//get all the visitors

    const getVisitors=async(req,res)=>{
        try{
            const visitors=await Visitor.find().sort({createdAt:-1});
            res.status(200).json(visitors);
        }
        catch(error){
            res.status(400).json({
                error:error.message
            });
        }
    };

//get single visitor

    const getVisitor=async(req,res)=>{
        try{
            const visitor=await Visitor.findById(req.params.id);
            if(!visitor){
                return res.status(404).json({
                    error:"visitor not found"
                });
            }
            res.status(200).json(visitor);
        }
        catch(error){
            res.status(400).json({
                error:error.message
            });
        }
    }

//update visitor

    const updateVisitor=async(req,res)=>{
        try{
            const visitor=await Visitor.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            
        if(!visitor){
                return res.status(404).json({
                    error:"visitor not found"
                });
            }
            res.status(200).json(visitor);
        }
        catch(error){
            res.status(400).json({
                error:error.message
            });
        }
    }

//delete visitor

    const deleteVisitor=async(req,res)=>{
        try{
            const visitor=await Visitor.findByIdAndDelete(req.params.id);
        if (!visitor) {
                return res.status(404).json({
                    error: "Visitor not found"
                });
            }

            res.status(200).json({
                message: "Visitor deleted successfully"
            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });
    }
    }

//check in/check out

    const checkVisitor=async(req,res)=>{
        try{
            const visitor=await Visitor.findById(req.params.id);
            if(!visitor){
                return res.status(404).json({
                    error:"Visitor not found"
                });
            }
            let action="";
            if(visitor.status==="Not Checked In"){
                visitor.status="Checked In";
                action="Check-In";
            }
            else if (visitor.status==="Checked In"){
                visitor.status="Checked Out"
                action="Check-Out";
            }
            else{
                return res.status(400).json({
                    error:"Visitor has already checked out"
                });
            }
            await visitor.save();
            await CheckLog.create({
                visitor:visitor._id,
                visitorName:visitor.visitorName,
                action,
                checkedBy:req.user.name
            });
            res.status(200).json(visitor);
        }catch(error){
            res.status(400).json({
                error:error.message
            });
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