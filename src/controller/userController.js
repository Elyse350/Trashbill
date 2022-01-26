import UserInfos from "../models/user";
import dataInfos from "../models/payment";

import bcrypt from "bcrypt"
import TokenAuth from "../helper/authToken";


class UserController{
    //create user in db
    
    static async createUser(req,res){
        const hashPassword=bcrypt.hashSync(req.body.password,10);
        req.body.password=hashPassword;
        const user =await UserInfos.create(req.body)
        if(!user){
            return res.status(404).json({error:"user not registered"})
        }
        return res
        .status(200)
        .json({message:"User created successfully" , data: user});
    }
    static async getAllUsers(req,res){
        const users =await UserInfos.find()
        if(!users){
            return res.status(404).json({error:"users not found"})
        }
        return res
        .status(200)
        .json({message:"Users found successfully" , data: users});
    }
    static async getOneUsers(req,res){
        const user =await UserInfos.findById(req.params.id)
        if(!user){
            return res.status(404).json({error:"user not found"})
        }
        return res
        .status(200)
        .json({message:"User found successfully" , data: user});
    }
    static async deletOneUser(req,res){
        const user =await UserInfos.findById(req.params.id)
        if(!user){
            return res.status(404).json({error:"user not deleted"})
        }
        return res
        .status(200)
        .json({message:"User deleted successfully" , data: user});
    }
    static async userLogin(req,res){
        const user=await UserInfos.findOne({phone:req.body.phone});
        
        if(!user){
          return res.status(404).json({error:"user not found! kindly register first"})
        }
        if(bcrypt.compareSync(req.body.password,user.password)){
            user.password=null;
            const token=TokenAuth.TokenGenerator({user:user});
            return res.status(200).json({message:"successfully logged in",token:token});
          }
  
          return res.status(404).json({error:"Password incorrect!"})
        }


        //aba tenant
        // static async createTenant(req,res){

        //     req.body.houseowner = req.params.id;
       
        //     const mate= await dataInfos.create(req.body); // return generated data
        //     if(!mate){
        //         return res.status(404).json({error:"mate not registered"})
        //     }
        //     return res
        //     .status(200)
        //     .json({message:"mate created successfully" , data: mate});
        // }
        
        // static async getAllTenants(req,res){
        //     const mates= await dataInfos.find(); // return generated data
        //     if(!mates){
        //         return res.status(404).json({error:"no mates registered"})
        //     }
        //     return res
        //     .status(200)
        //     .json({message:"Successfully retrieved mates" , data: mates});
        // }
    
        // static async getOneTenant(req,res){
        //     const mate=await dataInfos.findById(req.params.id);
        //     if(!mate){
        //         return res.status(404).json({error:"mate not found"})
        //     }
        //     return res.status(200).json({message:"mate found successfully",data:mate})
        // }
    
        // static async deleteOneTenant(req,res){
        //     const mate=await dataInfos.findByIdAndDelete(req.params.id);
        //     if(!mate){
        //         return res.status(404).json({error:"mate not deleted"})
        //     }
        //     return res.status(200).json({message:"mate deleted successfully",data:mate})
        // }
        // static async getAlltenantByLandlordId(req,res){
        //     const mates =await dataInfos.find({houseowner:req.params.id});
        //     if(!mates){
        //         return res.status(404).json({error: "not found"}); 
        //     }
        //     return res.status(200).json({message: "found successfuly", house: mates}) 
        // }
        
}
export default UserController;