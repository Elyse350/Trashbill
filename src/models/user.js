import mongoose from "mongoose";
const userSchema = new mongoose.Schema(  // Scheam is a format or a structure of our model, it will generate our model in db
     {
       firstName:String,
       lastName:String,
      
       password:{
           type:String,
           required:true,
       },
       phone: {
        type:String,
        required:true,
        unique:true,
    },
    
       
      
    role:{
        type:String,
        enum:["Admin","Tenant","Landlord"],
        default:"Admin"
       }
    },
       {
           timestamps: true, 
       }
)
const user = mongoose.model('User',userSchema)
export default user;