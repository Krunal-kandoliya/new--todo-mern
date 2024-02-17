const { JWT_TOKEN_SECRET, StatusCode}=require("../utils/constant")
const {jsonGenerate}=require("../utils/helper")
const Jwt=require("jsonwebtoken")

const AuthMiddleware = (req, res, next) => {
    if (req.headers["auth"] === undefined) {
      return res.json(jsonGenerate(StatusCode.AUTH_ERROR, "Access Denied"));
    }
  
    const token = req.headers["auth"];
  
    try {
      const decoded = Jwt.verify(token, JWT_TOKEN_SECRET);
      console.log(decoded);
  
      req.userId = decoded.userId;
  
      return next();
    } catch (error) {
      return res.json(
        jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Invalid Token")
      );
    }
  };

  module.exports={AuthMiddleware}