import jwt from "jsonwebtoken";

const generatedAccessToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "6h",
  });
  return token;
};

export default generatedAccessToken;
