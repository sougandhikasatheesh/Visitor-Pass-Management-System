const Appointment=require("../models/Appoinment");
//create apppointment
const createAppointment=async(req,res)=>{
    try{
        const{
            visitorName,
            employeeName,
            appointmentDate,
            appointmentTime,
            purpose
        }=req.body;
        const appointment = await Appointment.create({
            visitorName,
            employeeName,
            appointmentDate,
            appointmentTime,
            purpose
        });

        res.status(201).json(appointment);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

//get all appointmets 

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

//get single 

const getAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                error: "Appointment not found"
            });
        }

        res.status(200).json(appointment);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

//update appointment

const updateAppointment = async (req, res) => {
    try {

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({
                error: "Appointment not found"
            });
        }

        res.status(200).json(appointment);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

//delete appointment

const deleteAppointment = async (req, res) => {
    try {

        const appointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                error: "Appointment not found"
            });
        }

        res.status(200).json({
            message: "Appointment deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};


module.exports={
    createAppointment,
    getAppointments,
    getAppointment,
    updateAppointment,
    deleteAppointment
};