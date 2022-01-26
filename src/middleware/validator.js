import {check, validationResult} from "express-validator";

class Validator {
    static validateInput =(req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            const errorMessage = errors.errors.map((err)=>err.msg);
            return res.status(400).json({message:errorMessage});
        }
        return next();
    };

    static newAccountRules(){
        return [
           
            
           
            check("firstName","FirstName should be valid").trim().isAlpha(),
            check("lastName","LastName should be valid").trim().isAlpha(),
            check("password","password is strong").isStrongPassword(),
            check ("phone","phone is already exist").trim().isNumeric()

        ];


    }
    static newAcccounthouseRules(){
        return [
            check ("houseNo","house number is invalid").trim().isNumeric(),
            check("district","district be valid").trim().isAlpha(),
            check("sector","sector should be valid").trim().isAlpha()
   
                    ];

    }
}
export default Validator; 