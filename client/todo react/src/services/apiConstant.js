// import {API_URL} from "../../config"
import axios from 'axios'
import { gettokn } from './api'


export const deleteTdo=async(data)=>{
let token=gettokn()
console.log(token,'token')
return axios.post("http://localhost:9000/api/deletetodo",data,{
    headers:{
        auth:token
    },
    
})
}

export const markTdo=async(data)=>{
    let token=gettokn()
    console.log(token,'token')
    return axios.post("http://localhost:9000/api/marktodo",data,{
        headers:{
            auth:token
        },
        
    })
    }

    export const updatetodo=async(data)=>{
        let token=gettokn()
        console.log(token,'token')
        return axios.post("http://localhost:9000/api/updatetodo",data,{
            headers:{
                auth:token
            }
        })
    }

// const handledelete=async()=>{
//     try {
//       const token = gettokn();
  
//       const response = await axios.delete("http://localhost:9000/api/deletetodo",todo, {
//         headers: {
//           auth: token,
//         },
//         todo_id: todo._id, 
//       });
  
//       console.log(response)
//     } catch (error) {
//       console.log(error)
//     }
//     }