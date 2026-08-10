const twilio=require("twilio")

const client=twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const sendSMS=async(to,message)=>{
    try{
        const sms=await client.messages.create({
            body:message,
            from:process.env.TWILIO_PHONE_NUMBER,
            to:to
        });
        console.log("SMS sent successfully:",sms.sid);
        return sms;
    }catch(error){
        console.log("SMS not sent:",error.message)
        throw error;
    }
};
module.exports=sendSMS;