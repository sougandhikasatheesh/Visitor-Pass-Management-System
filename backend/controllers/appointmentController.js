const Appointment=require("../models/Appointment");

//create appointment

const createAppointment=async(req,res)=>{
    try{
        const visitorName=req.body.visitorName;
        const employeeName=req.body.employeeName;
        const appointmentDate=req.body.appointmentDate;
        const appointmentTime=req.body.appointmentTime;
        const purpose=req.body.purpose;

        const appointment=await Appointment.create({
            visitorName:visitorName,
            employeeName:employeeName,
            appointmentDate:appointmentDate,
            appointmentTime:appointmentTime,
            purpose:purpose
        });
        res.status(201).json(appointment);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

//get all appointment

const getAppointments=async(req,res)=>{
    try{
        const appointments=await Appointment.find().sort({createdAt:-1});
        res.status(200).json(appointments);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

//get single appointment

const getAppointment=async(req,res)=>{
    try{
        const appointment=await Appointment.findById(req.params.id);
        if(!appointment){
            return res.status(404).json({error:"Appointmnet not found"});
        }
        res.status(200).json(appointment);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

//update appointment

const updateAppointment=async(req,res)=>{
    try{
        const appointment=await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!appointment){
            return res.status(404).json({error:"Appointment not found"});
        }
        res.status(200).json(appointment);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

//delete appointment

const deleteAppointment=async(req,res)=>{
    try{
        const appointment=await Appointment.findByIdAndDelete(req.params.id);
        if(!appointment){
            return res.status(404).json({error:"Appointment not found"});
        }
        res.status(200).json({message:"Appointment deleted"});
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

module.exports={
    createAppointment,
    getAppointments,
    getAppointment,
    updateAppointment,
    deleteAppointment
};