import dotenv from "dotenv";

import {application}from "express";
dotenv.config();
const client=require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_ID
);
const sendSMS=(userName,applicationStatus,applicationId,userPhone)=>{
    client.messages
    .create({
        body:
        "Hey your trash bill is  paid successfully thank you!"+



        userName+
        ",your"+
        applicationStatus+
        "refId:"+


        
        applicationId,
        from:"+19852383839",
        to:userPhone
    })
    .then((message)=> console.log(message.sid));
    };
    export default sendSMS;