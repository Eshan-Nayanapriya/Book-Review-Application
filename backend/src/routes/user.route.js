import { Router } from "express";
import {
  logoutUserController,
  registerUserController,
} from "../controllers/user.controller.js";
import { loginUserController } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutUserController);

export default userRouter;
