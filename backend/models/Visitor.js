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
    photo: {
    type: String,
    default: ""
    },
    status:{
        type:String,
        enum:['Pending','Approved','Rejected','Checked In','Checked Out'],
        default:'Pending'
    },
    checkStatus:{
        type:String,
        enum:["Not Checked In","Checked In","Checked Out"],
        default:"Not Checked In"
    },
    qrCode: {
    type: String
    },
},
{
    timestamps:true
}
);
module.exports=mongoose.model('Visitor',visitorSchema);
