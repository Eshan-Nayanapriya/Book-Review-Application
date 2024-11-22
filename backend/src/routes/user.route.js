import { Router } from "express";
import {
  forgotPasswordController,
  logoutUserController,
  registerUserController,
} from "../controllers/user.controller.js";
import { loginUserController } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutUserController);
userRouter.put("/forgot-password", forgotPasswordController);
export default userRouter;
