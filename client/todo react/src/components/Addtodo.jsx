import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { gettokn } from '../services/api';

const Addtodo = ({setRefres}) => {
    const[tododec,setTododec]=useState({
        title:"",
        desc:""
    })

 

    const handlechange=(e)=>{
        setTododec({...tododec, [e.target.name]: e.target.value })
    }

    const handletodosubmit=async()=>{
        console.log(tododec,'todo')
        if(tododec === ''){
toast('todo is required')
return;
        }
        let token=gettokn()
        console.log(token,'token')
        const result=await axios.post("http://localhost:9000/api/createTodo",tododec,{
            headers:{
                auth:token
            }
        })
        if(result.status === 200 && result.data.status === 200){
          setTododec({title:"",desc:""})
            toast('todo add')
            setRefres(new Date())
        }else{
            toast(result.data.message);
        }
    }

  return (
    <>
    <ToastContainer/>
    <div className="modal mt-5" id="exampleModal">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Add new Todo</div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="close"
          >
            <span arial-hidden="true"></span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <textarea name="title" className="form-control" rows={1} onChange={handlechange} placeholder="write Todo Title..." ></textarea>
            <textarea name="desc" className="form-control" rows={3} onChange={handlechange} placeholder="write Todo..." ></textarea>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handletodosubmit} data-bs-dismiss="modal" >save todo</button>
          <button className="btn btn-secondary" onClick={()=>setTododec(" ")} data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default Addtodo
