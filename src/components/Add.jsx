import React, { useState } from 'react'

function Add() {
    const [Task, setTask] = useState('')

    const addTask = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL+"add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ NameofTheTask: Task }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log("Task added:", Task);
            location.reload(); // refresh the whole web page
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };


    return (
        <div>
            <div className="container bg-blue-300 flex mx-auto my-2  p-3 justify-around rounded">

                <div>
                    <input type="text" className='w-200 max-lg:w-120 max-md:w-100 max-sm:w-45 bg-white p-1 rounded placeholder-blue-700 text-blue-800 font-bold' placeholder='Enter Task...' onChange={(e) => setTask(e.target.value)} />
                </div>

                <div>
                    <button onClick={() => { addTask() }} className='bg-white text-blue-500 p-1 rounded cursor-pointer hover:bg-blue-500 hover:text-white font-bold shadow-sm' >
                        Add Task</button>
                </div>
            </div>
        </div>
    )
}

export default Add