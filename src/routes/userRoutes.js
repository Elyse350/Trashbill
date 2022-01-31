import UserController from "../controller/userController";
import express from "express";


import Validator from "../middleware/validator";
import DataChecker from "../middleware/datachecker";
import VerifyToken from "../middleware/verifyToken";
import VerifyAccess from "../middleware/verifyAccess";
const userRouter = express.Router();

userRouter.post(
  "/register",
  DataChecker.isPhoneExist,
  Validator.newAccountRules(),
  Validator.validateInput,
  UserController.createUser
);
userRouter.get("/getusers", UserController.getAllUsers);
userRouter.get("/:id", UserController.getOneUsers);
userRouter.delete("/:id", UserController.deletOneUser);
userRouter.post("/login", UserController.userLogin);
//payment

userRouter.post(
  "/payment",
  VerifyToken,
  VerifyAccess("Tenant"),
  UserController.payment
);
userRouter.get(
  "/payments/all",
  VerifyToken,
  VerifyAccess("Admin"),
  UserController.getAllPayments
);
userRouter.patch(
  "/payment/status",
  VerifyToken,
  VerifyAccess("Admin"),
  UserController.changePaymentStatus
);
userRouter.get(
  "/payments/pending",
  VerifyToken,
  VerifyAccess("Admin"),
  UserController.getPendingPayments
);

export default userRouter;
