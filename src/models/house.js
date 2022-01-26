import mongoose from 'mongoose';
const houseSchema = new mongoose.Schema(
    {
        
        houseNo:{
            type:String,
            required:true
        },
        district:{
            type:String,
            required:true
        },
        sector:{
            type:String,
            required:true

        },
        landLordId:{
            type:mongoose.Schema.ObjectId,
            ref:"Landlord",
            require:true
        },
       
    },
       {
           timestamps: true, 
       }
);

const house = mongoose.model('house',houseSchema);

export default house;