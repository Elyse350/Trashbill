import express from "express";
import houseController from "../controller/dataController";
import Validator from "../middleware/validator";
import DataChecker from "../middleware/datachecker";
import VerifyToken from "../middleware/verifyToken";
import VerifyAccess from "../middleware/verifyAccess";
const houseRouter = express.Router();

houseRouter.post(
  "/house",
  VerifyToken,
  VerifyAccess("Landlord"),
  Validator.newAcccounthouseRules(),
  Validator.validateInput,
  houseController.createInfos
);
houseRouter.get("/getallhouse", houseController.getAllhouseInfos);


houseRouter.get("/:id", houseController.getOnehouseInfos);
houseRouter.delete("/:id", houseController.deleteOnehouseInfos);


export default houseRouter;
