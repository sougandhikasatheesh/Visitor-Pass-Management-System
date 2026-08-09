const mongoose=require("mongoose");

const checkLogSchema = new mongoose.Schema(
    {
        visitor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Visitor",
            required:true
        },
        visitorName:{
            type:String,
            required:true
        },
        action:{
            type:String,
            enum:["Check-In","Check-Out"],
            required:true
        },
        checkedBy:{
            type:String,
            required:true
        },
        time:{
            type:Date,
            default:Date.now
        }
    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("CheckLog",checkLogSchema);