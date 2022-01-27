
import houseInfos from "../models/house"
class houseController{
    
    static async createInfos(req,res){
        req.body.landLordId = req.user._id;
        
        const house= await houseInfos.create(req.body); 
        if(!house){
            return res.status(404).json({error:"houseinformation not registered"})
        }
        return res
        .status(200)
        .json({message:"houseinformation Created successfully" , data: house});
    }
    
    
    static async gethouseInfos(req,res){
        req.body.landLordId = req.params.id;
        const house=await houseInfos.find({landLordId:req.params.id});
        if(!house){
            return res.status(404).json({error:"houseInfos not found"})
        }
        return res.status(200).json({message:"houseinformation found successfully", data: house})
    }

    static async deleteOnehouseInfos(req,res){
        const house=await houseInfos.findByIdAndDelete(req.params.id);
        if(!house){
            return res.status(404).json({error:"houseinformation not deleted"})
        }
        return res.status(200).json({message:"houseinformation deleted successfully", data: house})
    }
    
    

   
}
export default houseController;