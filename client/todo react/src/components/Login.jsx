import React, { useEffect, useState } from "react";
import {  useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import Header from "./Header";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {

    const user=localStorage.getItem('user')
  if(user){
     return navigate('/')
  }
    
    }, [])
  

  const [error, setError] = useState(null);
 

  const handleClick = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await axios.post("http://localhost:9000/api/v1/login", form);
      console.log(result)
      setError(null);
      if(result.status == 200){
        if(result.data.status===200){
          localStorage.setItem('user',JSON.stringify(result.data.data))
          navigate("/")
          return;
        }
        if(result.data.status === 201){
setError(result.data.data)
return;
        }
        if(result.data.status===202){
          toast(result.data.message)
          return;
        }
      }
  };
  

  return (
    <>
    <Header/>
    <div className="container">
      <ToastContainer/>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-5 card border-primary mt-4">
          <div className="card border-primary mb-3" style={{ maxWidth: "20rem" }}>
            <div className="card-body">
              <h4 className="card-title">Login Now</h4>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  Email or Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleClick}
                  name="username"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email or Username"
                />

                {
                  error?.username &&    ( <small id="emailHelp" className="form-text text-muted">
                  {error.username.msg}
                </small>
               ) }
            
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={handleClick}
                  name="password"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter password"
                />{
                  error?.password &&  <small id="emailHelp" className="form-text text-muted">
                 {error.password.msg}
                </small>
                }
               
              </div>
              <button type="button" onClick={handleSubmit} className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default Login;
