import React from 'react'

import '../App.css'
import { baseURL } from '../utils/Constant'
import axios from 'axios'
import { useEffect } from 'react'
function List({id,task,setUpdateUI,updateMode}) {
    useEffect(()=>{
        document.title=`you have ${task.length} pending tasks`
        // setUpdateUI((prevState)=>!prevState)
      
    })
    const removeTask=()=>{
        axios.delete(`${baseURL}/delete/${id}`).then((res)=>{
            console.log(res);
            setUpdateUI((prevState)=>!prevState)
        })
    }
    
  return (
    <li>
        {task}
        
            <i className='fa-sharp fa-solid fa-edit' onClick={()=>updateMode(id,task)}></i>
            <i className='fa-sharp fa-solid fa-trash' onClick={removeTask}></i>
       

    </li>
  )
}

export default List