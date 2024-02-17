const { validationResult } = require("express-validator");
const { StatusCode, JWT_TOKEN_SECRET } = require("../utils/constant");
const { jsonGenerate } = require("../utils/helper");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.json(
        jsonGenerate(
          StatusCode.VALIDATION_ERROR,
          "Validation error",
          errors.mapped()
        )
      );
    }
  
    const { name, username, password, email } = req.body;
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
  
      const userExist = await User.findOne({
        $or: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      });
  
      if (userExist) {
        return res.json(
          jsonGenerate(
            StatusCode.UNPROCESSABLE_ENTITY,
            "User or Email already exists"
          )
        );
      }
  
      const result = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        username: username,
      });
  
      const token = jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET);
  
      return res.json(
        jsonGenerate(StatusCode.SUCCESS, "Registration successful", {
          userId: result._id,
          token: token,
        })
      );
    } catch (error) {
      console.error(error);
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Could not complete registration",
          null
        )
      );
    }
  };
  
  module.exports = {Register};


