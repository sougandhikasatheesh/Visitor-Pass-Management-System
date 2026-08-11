const mongoose=require("mongoose");
const appointmentSchema=new mongoose.Schema(
    {
        visitorName:{
            type:String,
            required:true
        },
        employeeName:{
            type:String,
            required:true
        },
        appointmentDate:{
            type:String,
            required:true
        },
        appointmentTime:{
            type:String,
            required:true
        },
        purpose:{
            type: String,
            required: true
        },
        status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Appointment", appointmentSchema);