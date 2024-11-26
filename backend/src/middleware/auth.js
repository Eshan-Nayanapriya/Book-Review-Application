import jwt from "jsonwebtoken";

const auth = (request, response, next) => {
  try {
    const token =
      request.cookies.accessToken ||
      request?.header?.authorization?.split(" ")[1]
    if (!token) {
      return response.status(401).json({
        message: "Token not found!",
        error: true, 
        success: false,
      });
    }

    const decode = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    if(!decode){
      return response.status(401).json({
        message: "Unauthorized access!",
        error: true,
        success: false,
      });
    }

    request.userId = decode.id;
    next();
    
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default auth;
