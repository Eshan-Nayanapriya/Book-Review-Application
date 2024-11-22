import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generatedAccessToken from "../utils/generateAccessToken.js";
import generatedRefreshToken from "../utils/generateRefreshToken.js";
import generateOTP from "../utils/generatedOTP.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import sendEmail from "../config/sendEmail.js";

//Register
export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Name, Email and Password are required!",
        error: true,
        success: false,
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return response.status(409).json({
        message: "Email already registered!",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new UserModel(payload);
    const savedUser = await newUser.save();

    return response.status(201).json({
      message: "User registered successfully!",
      data: savedUser,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//Login
export async function loginUserController(request, response) {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({
        message: "Email and Password are required!",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(404).json({
        message: "User not found. Please register first!",
        error: true,
        success: false,
      });
    }

    const checkpassword = await bcryptjs.compare(password, user.password);
    if (!checkpassword) {
      return response.status(400).json({
        message: "Incorrect Password!",
        error: true,
        success: false,
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const cookiesoption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    response.cookie("accessToken", accessToken, cookiesoption);
    response.cookie("refreshToken", refreshToken, cookiesoption);

    return response.status(200).json({
      message: "User logged in successfully!",
      data: {
        user: { id: user._id, name: user.name, email: user.email },
        accessToken,
        refreshToken,
      },
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//Logout
export async function logoutUserController(request, response) {
  try {
    const userid = request.userId;

    const cookiesoption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.clearCookie("accessToken", cookiesoption);
    response.clearCookie("refreshToken", cookiesoption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return response.status(200).json({
      message: "User logged out successfully!",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//forgot password
export async function forgotPasswordController(request, response) {
  try {
    const { email } = request.body;
    if (!email) {
      return response.status(400).json({
        message: "Email is required!",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(404).json({
        message: "User not found. Please register first!",
        error: true,
        success: false,
      });
    }

    const otp = generateOTP();
    const expiresIn = new Date().getTime() + 1000 * 60 * 10; //expires in 10 minutes

    const update = await UserModel.findByIdAndUpdate(
      { _id: user._id },
      {
        forgot_password_otp: otp,
        forgot_password_expiry: new Date(expiresIn).toDateString(),
      }
    );

    await sendEmail({
      sendTo : email,
      subject : "Reset Password OTP from BookHive",
      html : forgotPasswordTemplate({name : user.name, otp : otp})
    })

    return response.status(200).json({
      message: "OTP sent to your email!",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
