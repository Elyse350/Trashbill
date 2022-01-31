import dotenv from "dotenv";

import {application}from "express";
dotenv.config();
const client=require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_ID
);
const sms=(userName,paymentStatus,paymentId,userPhone)=>{
    client.messages
    .create({
        body:
        "Hey your trash bill is not paid, Please pay"+



        userName+
        ",your"+
 paymentStatus+
        "refId:"+


        
        paymentId,
        from:"+19852383839",
        to:userPhone
    })
    .then((message)=> console.log(message.sid));
    };
    export default sms;