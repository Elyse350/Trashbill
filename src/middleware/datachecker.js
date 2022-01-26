import { check } from "express-validator"
import user from "../models/user"
import userInfos from "../models/user"





class dataChecker{

    // check if user email exist

    static async isPhoneExist(req,res,next){


        const user= await userInfos.findOne({phone: req.body.phone})
        if(!user) {
            
            return next();
        }
         return res.status(401).json({error:"phone arleady exist"})
    }

}
export default dataChecker 