const User=require("../models/userModel")
const{StatusCode}=require("../utils/constant")
const{jsonGenerate}=require("../utils/helper")


const GetTodos = async (req, res) => {
    try {
      const list = await User.findById(req.userId)
        .select("-password")
        .populate("todos")
        .exec();
  
      return res.json(jsonGenerate(StatusCode.SUCCESS, "All todo list", list));
    } catch (error) {
      return res.json(
        jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
      );
    }
  };

  module.exports={GetTodos}