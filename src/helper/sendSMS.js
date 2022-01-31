import dotenv from"dotenv";
import { application } from "express";
dotenv.config();
const client=require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_ID
);

const sendSMS=(userName,paymentStatus,paymentId,userPhone)=>{
    client.messages
    .create({
        body:
        "hey your trash bill is not paid, please pay"+



        userName+
        ",your"+
        paymentStatus+
        "refId:"+


        paymentId,
        from:"+19802172372",
        to:userPhone
    })
    .then((message)=>console.log(message.sid));

};
export default sendSMS;