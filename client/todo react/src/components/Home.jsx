import React,{useEffect, useState} from "react";
import Header from "./Header";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Todo from "./Todo";
import Addtodo from "./Addtodo";
import { gettokn } from "../services/api";

const Home = () => {
const[list,setList]=useState([])
const[refres,setRefres]=useState()
const[search,setsearch]=useState("")
const[filter,setfilter]=useState([])

const navigate=useNavigate()

useEffect(() => {
if(search === ''){
  setfilter(list)
}else{
  const filterd=list.filter(todo=>todo.title.toLowerCase().includes(search.toLowerCase().trim()))
  setfilter(filterd)
}

 
}, [list,search])


useEffect(() => {
 if(!gettokn()){
navigate("/login")
 }
 fetched()
}, [refres])

const fetched=async()=>{
 let token=gettokn()
  const result=await axios.get("http://localhost:9000/api/todolist",{
    headers:{
      auth:token
    }
  })
  console.log("todolist",result)
  if(result.status===200 && result.data.status===200){
    setList(result.data.data.todos)
  }
}

  return (
    <div>
      <Header search={search} setsearch={setsearch} />
      <div className="container">
        <div className="row justify-content-md-center mt-4 ">
          {
            filter.map((todo,index)=> <Todo todo={todo} key={todo._id} setRefres={setRefres} /> )
          }

          {
            filter.length===0 && <div className="nofoundtodo">
              <h1>No todos Found</h1>
            </div>
          }
          
  
        </div>
      </div>
      <div
        className=""
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-success"
        >
          Add
        </button>
      </div>
     <Addtodo setRefres={setRefres} />
    </div>
  );
};

export default Home;
