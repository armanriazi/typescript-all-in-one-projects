import { Request, Response } from "express";
import userController from "../controllers/user";
import * as express from "express";

const userRoute = express.Router();
 
userRoute.get("/", async (req: Request, res: Response) => {
  return res.send("I am flying user!!!");
});

//you can add middle ware for validating token,etc
userRoute.post("/", userController.registerUser);

userRoute.get("/get-data/:id", userController.getUsertDtById);

export default userRoute;