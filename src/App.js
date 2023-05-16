import React,{useState} from 'react'
import List from './components/List'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
// import { baseURL } from './utils/Constant'
export const baseURL=process.env.REACT_APP_SERVER_API
function App() {
  const [input,setInput]=useState('')
  const [tasks,setTasks]=useState([])
  const [updateUI,setUpdateUI]=useState(false)
  const [updateId,setUpdateId]=useState(false)
  useEffect(()=>{
       axios.get(`${baseURL}`)
       .then((res)=>{
        console.log(res.data)
        setTasks(res.data)
        
  })
  },[updateUI])

  const addTask=(e)=>{
    e.preventDefault()
    axios.post(`${baseURL}/save`,{task:input}).then((res)=>{
      console.log(res.data)
      setInput('')
      setUpdateUI((prevState)=>!prevState)
    })
  }
  const updateTask=()=>{
    axios.put(`${baseURL}/update/${updateId}`,{task:input}).then((res)=>{
      setUpdateUI((prevState)=>!prevState)
      setUpdateId(null)
      setInput('')
    })
  }
  const updateMode=(id,text)=>{
       setInput(text)
       setUpdateId(id)
  }
  return <main className='Todo-container'>
<form className="input-section" onSubmit={addTask}>
    <h1 className='title'>Todo List</h1>
  <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Enter Items'/>
<button className='btn' type='submit'onClick={updateId? updateTask : addTask}>{updateId?"update task":"Add task"}</button>
</form>
<ul>
  {tasks.map((task)=>(
  <List key={task._id} id={task._id} task={task.task} setUpdateUI={setUpdateUI} updateMode={updateMode}/>))}
</ul>
  </main>
    
  
}

export default App;
