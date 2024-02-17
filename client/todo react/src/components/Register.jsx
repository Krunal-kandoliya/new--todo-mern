import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

const Register = () => {
  const[form,setForm]=useState({
    name:"",
    username:"",
    email:"",
    password:""
  })
const navigate=useNavigate()
  const[errors,seterrors]=useState(null)

  useEffect(() => {

  const user=localStorage.getItem('user')
if(user){
   return navigate('/login')
}
  
  }, [])
  

  const handleinpchange=(e)=>{
    setForm({...form, [e.target.name]: e.target.value })
  }

  const handlesubmit=async()=>{
   const result=await axios.post("http://localhost:9000/api/v1/register",form)
 if(result.status ===200){
  if(result.data.status===201){
    seterrors(result.data.data)
    toast(result.data.message)
    return;
  }
  if(result.data.status===200){
  localStorage.setItem('user',JSON.stringify(result.data.data))
navigate('/login')
    return;
  }

  if(result.data.status===202){
toast(result.data.message)
      return;
    }

 }else{
  toast("something went wrong")
 }
  }

  return (
    <>
    <Header/>
    <div className='container' >
      <ToastContainer/>
      <div className='row justify-content-md-center mt-4 ' >
<div className='col-lg-5 card border-primary mb-3' >
<div className='card-header h4 text-center'>
  Register An Account
</div>
<div className="card-body">
<div className="form-group">
    <label className='col-form-label mt-4'>
      Name
    </label>
    <input type="text" className='form-control' placeholder='Enter Name' name='name' onChange={handleinpchange}  />
    {
                  errors?.name &&    ( <small id="emailHelp" className="form-text text-danger">
                  {errors.name.msg}
                </small>
               ) }
  </div>
  <div className="form-group">
    <label className='col-form-label mt-4'>
      Username
    </label>
    <input type="text" className='form-control' placeholder='Enter Username' name='username' onChange={handleinpchange} />
    {
                  errors?.username &&    ( <small id="emailHelp" className="form-text text-danger">
                  {errors.username.msg}
                </small>
               ) }
  </div>
  <div className="form-group">
    <label className='col-form-label mt-4'>
      Email
    </label>
    <input type="email" className='form-control' placeholder='Enter your Email' name='email' onChange={handleinpchange} />
    {
                  errors?.email &&    ( <small id="emailHelp" className="form-text text-danger">
                  {errors.email.msg}
                </small>
               ) }
  </div>
  <div className="form-group">
    <label className='col-form-label mt-4'>
    Password
    </label>
    <input type="password" className='form-control' placeholder='Enter your password' name='password' onChange={handleinpchange} />
    {
                  errors?.password &&    ( <small id="emailHelp" className="form-text text-danger">
                  {errors.password.msg}
                </small>
               ) }
  </div>
  <div className="row justify-content-md-center form-group mt-4 ">
    <button type='button' className='col-sm-6 btn btn-outline-secondary center' onClick={handlesubmit} >Register Now</button>
  </div>
</div>
</div>
      </div>
      
    </div>
    </>
  )
}

export default Register
