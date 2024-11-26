import { Router } from "express";
import {
  forgotPasswordController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
  resetPasswordController,
  updateUserDetailsController,
  uploadUserAvatarController,
  verifyEmailController,
  verifyForgotPasswordOTPController,
} from "../controllers/user.controller.js";
import { loginUserController } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware//multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutUserController);
userRouter.put(
  "/upload-avatar",
  auth,
  upload.single("avatar"),
  uploadUserAvatarController
);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put(
  "/verify-forgot-password-otp",
  verifyForgotPasswordOTPController
);
userRouter.put("/update-user", auth, updateUserDetailsController);
userRouter.put("/reset-password", resetPasswordController);
userRouter.post("/refresh-token", refreshTokenController);
export default userRouter;
