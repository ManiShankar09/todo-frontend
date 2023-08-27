import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Todo = () => {
    const [task, setTask] = useState('')
    const[data, setData] = useState();
    const [addClick, setAddClick] = useState(false);
    const [get, setGet] = useState(false);


    const fetchData = async() => {
        axios.get('https://todo-sexn.onrender.com/tasks').then(res => setData(res.data))
    }

    useEffect(() => {
        fetchData()
    }, [])
    

    const addTask = async(e) => {
        setAddClick(true)
        axios.post('https://todo-sexn.onrender.com/add', {task})
        .then((res) => {
            setTask("")
            if (res.status === 200){
                fetchData()
                .then(() => {
                    setGet(true)
                })
            }
        })       
    }


    const removeTask = async(id) => {
        axios.delete(`https://todo-sexn.onrender.com/remove/${id}`)
        .then((res) => {
            console.log(res);
            if (res.status === 200){
                fetchData();
            }
        })
    }

  return ( 
    <div>
        <div class=" h-screen w-full flex items-center justify-center bg-teal-200 font-sans">
            <div class=" bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                <div class=" mb-4">
                    <h1 class=" font-bold">Todo List</h1>
                    <div class="flex mt-4">
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 outline-none" placeholder="Add Todo" value={task} onChange={e => setTask(e.target.value)} />
                        <button class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:bg-green-500 hover:text-white" onClick={addTask}>{addClick && !get ? 'Adding' : 'Add' }</button> 
                    </div>
                </div>
                {
                    data && data.map(task => (
                        <div key={task._id}>
                            <div class="flex mb-4 items-center">
                                <p class="w-full text-grey-darkest">{task.task}</p> 
                                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red-500" onClick={() => removeTask(task._id)}>Remove</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Todo