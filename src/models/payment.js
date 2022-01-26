import mongoose from 'mongoose';
const paymentSchema = new mongoose.Schema(  
    {
        tenant:{
            type:mongoose.Schema.ObjectId,
            ref:"tenant"
        },
    houseid:{
        type:mongoose.Schema.ObjectId,
        ref:"house" 
        },
        Month:{
            type:String,
            required:true
        },
        Amount:{
            type:String,
            required:true
        },
        ispaid:{
            type:String,
            enum:["pending","paid","not paid"],
        default:"pending"

        }
    
    },
       {
           timestamps: true,  
       }
);
const payment = mongoose.model('payment',paymentSchema);

export default payment;