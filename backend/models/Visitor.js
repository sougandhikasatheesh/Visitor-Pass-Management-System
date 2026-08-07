const mongoose=require("mongoose");
const visitorSchema=new mongoose.Schema(
{
    visitorName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    purpose:{
        type:String,
        required:true   
    },
    personToMeet:{
        type:String,
        required:true
    },
    visitDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Approved','Rejected','Checked In','Checked Out'],
        default:'Pending'
    }
},
{
    timestamps:true
}
);
module.exports=mongoose.model('Visitor',visitorSchema);
