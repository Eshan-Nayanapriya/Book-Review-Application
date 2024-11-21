import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const generatedRefreshToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  const updateRefreshTokenUser = await UserModel.updateOne(
    { _id: userId },
    { refresh_token: token }
  );
  return token;
};

export default generatedRefreshToken;
