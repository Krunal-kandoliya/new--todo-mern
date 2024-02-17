const express=require('express')
const {check}=require("express-validator")
const {Login}=require("../controllers/LoginController")
const {markTodo}=require("../controllers/MarktodoController")
const {Register}=require("../controllers/RegisterController")
const{RemoveTodo}=require("../controllers/RemovetodoController")
const{createTodo}=require("../controllers/TodoController")
const{GetTodos}=require("../controllers/TodolistController")
const{LoginSchema}=require("../validation/LoginSchema")
const{RegisterShema}=require("../validation/RegisterSchema")
const {  updateTodo } = require('../controllers/updateController')

const router=express.Router()
const apiProtected=express.Router()

router.post("/register",RegisterShema,Register)
router.post("/login",LoginSchema,Login)

apiProtected.post("/createTodo",[check("desc", "Todo desc is required").exists()],createTodo)
apiProtected.post("/marktodo",[check("todo_id", "Todo id  is required").exists()],markTodo)
apiProtected.post("/deletetodo",[check("todo_id", "Todo id  is required").exists()],RemoveTodo)
apiProtected.post("/updatetodo",[check("todo_id", "Todo id  is required").exists()],updateTodo)
apiProtected.get("/todolist",GetTodos)

module.exports={router,apiProtected}
