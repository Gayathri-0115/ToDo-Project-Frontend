import React, { useState } from 'react';

function Add() {
  const [Task, setTask] = useState('');

  const addTask = async () => {
    if (!Task.trim()) {
      alert('Please enter a task before adding.');
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "add", {
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
      setTask(""); // Clear input
      location.reload(); // reload for simplicity (you can improve with state update)
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 py-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <input
          type="text"
          className="flex-1 w-full sm:w-auto border border-blue-300 focus:ring-2 focus:ring-blue-500 rounded-xl px-3 py-2 text-blue-800 placeholder-blue-400 font-semibold transition-all duration-300"
          placeholder="Enter a task..."
          value={Task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          onClick={addTask}
          className="mt-2 sm:mt-0 bg-blue-500 text-white font-bold px-4 py-2 cursor-pointer rounded-xl shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
        >
          ➕ Add Task
        </button>
      </div>
    </div>
  );
}

export default Add;
