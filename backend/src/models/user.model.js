import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    verify_email: {
      type: Boolean,
      required: [true, "Email verification is required"],
      default: false,
    },
    avatar: {
      type: String,
      required: [true, "Avatar is required"],
      default: "",
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
      required: [true, "User Role is required"],
      unique: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: false,
    },
    refresh_token: {
      type: String,
      default: "",
    },
    forgot_password_otp: {
      type: String,
      default: null,
    },
    forgot_password_expiry: {
      type: Date,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
