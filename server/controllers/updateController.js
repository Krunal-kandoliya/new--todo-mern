const { validationResult } = require('express-validator');
const Todo = require('../models/todoModel');
const { StatusCode } = require('../utils/constant');
const { jsonGenerate } = require('../utils/helper');

const updateTodo = async (req, res) => {
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

  try {
    const { todo_id, title, desc } = req.body;

    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: todo_id,
        userId: req.userId,
      },
      {
        $set: {
          title,
          desc,
        },
      },
      { new: true }
    );

    if (updatedTodo) {
      return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo updated", updatedTodo));
    } else {
      return res.json(jsonGenerate(StatusCode.NOT_FOUND, "Todo not found", null));
    }
  } catch (error) {
    console.error(error);
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not update todo", null)
    );
  }
};

module.exports = { updateTodo };
