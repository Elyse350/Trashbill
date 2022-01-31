import UserInfos from "../models/user";
import dataInfos from "../models/payment";
import sendSMS from "../helper/sendSMS"
import sendSMS from "../helper/sendSMS";
import sms from "../helper/sms";
import bcrypt from "bcrypt"
import TokenAuth from "../helper/authToken";


class UserController {
    //create user in db

    static async createUser(req, res) {
        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashPassword;
        const user = await UserInfos.create(req.body)
        if (!user) {
            return res.status(404).json({ error: "user not registered" })
        }
        return res
            .status(200)
            .json({ message: "User created successfully", data: user });
    }
    static async getAllUsers(req, res) {
        const users = await UserInfos.find()
        if (!users) {
            return res.status(404).json({ error: "users not found" })
        }
        return res
            .status(200)
            .json({ message: "Users found successfully", data: users });
    }
    static async getOneUsers(req, res) {
        const user = await UserInfos.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }
        return res
            .status(200)
            .json({ message: "User found successfully", data: user });
    }
    static async deletOneUser(req, res) {
        const user = await UserInfos.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "user not deleted" })
        }
        return res
            .status(200)
            .json({ message: "User deleted successfully", data: user });
    }
    static async userLogin(req, res) {
        const user = await UserInfos.findOne({ phone: req.body.phone });

        if (!user) {
            return res.status(404).json({ error: "user not found! kindly register first" })
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            user.password = null;
            const token = TokenAuth.TokenGenerator({ user: user });
            return res.status(200).json({ message: "successfully logged in", token: token });
        }

        return res.status(404).json({ error: "Password incorrect!" })
    }



    //payment
    static async payment(req, res) {

        req.body.tenant=req.user._id;
        const payment = await dataInfos.create(req.body);
        if (!payment) {
            return res.status(404).json({ error: "payment not recognised" })
        }
        return res
            .status(200)
            .json({ message: " successfully payment", data: payment });
    }

    static async onePaymentById(req, res){

        const payment = await dataInfos.findById(req.params.id);
        if(!payment){
            return res.status(400).json({error: "no payments recorded"})
        }
        return res.status(200).json({message: "retrived payments record",data:payment});

    }
    static async getPendingPayments(req,res){
        const {isPaid}=req.body;
        const payment=await  dataInfos.findById({isPaid:"pending"});
         
        if(!payment){
            return res.status(400).json({error:"payment not found"});


        }
        
        sendSMS(
           payment.user.tenant.lastName,
           payment.status,
           payment._id,
           payment.user.phone
            );
           
   
            return res.status(200).json({message:"success",data:payments})
         }
           
    static async getAllPayments(req,res){
        const payments =await dataInfos.find();
        if(!payments){
            return res.status(404).json({error: "payments not found"});
        }
        return res.status(200).json({message: "found successfuly", data: payments}) 
    }
    static async changePaymentStatus(req,res){
        const { id,isPaid} =req.body;
        const payment =await  dataInfos.findByIdAndUpdate(id,{isPaid:isPaid},{new:true});


        console.log(payment)

        if(!payment){
            return res.status(404).json({error: "failed to update status"}); 
        } 
        sendSMS(payment.tenant.lastName,payment.isPaid,payment._id,payment.tenant.phone);
        res.status(200).json({message: "sucess", data: payment}) 
    }
    static async getPendingPayments(req,res){
    
        const payments =await dataInfos.find({isPaid:"pending"});
        
        if(!payments){
            return res.status(404).json({error: "payments not found"});
        }
        return res.status(200).json({message: "found successfuly", data: payments}) 
    }
    static async getPendingPaymentById(req,res){
    
        const payment =await dataInfos.findById({isPaid:"pending"});
        
        if(!payment){
            return res.status(404).json({error: "payments not found"});
        }
        sms(payment.tenant.lastName,payment.ispaid,payment._id,payment.tenant.phone);
        res.status(200).json({message: "sucess", data: payment}) 
    }
    

}
export default UserController;