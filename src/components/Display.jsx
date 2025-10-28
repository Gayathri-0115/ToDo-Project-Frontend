import React, { useState, useEffect } from 'react';
import './Display.css'; 

function Display() {
  const [alldata, setalldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);      
  const [editTask, setEditTask] = useState("");    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + 'get');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

       const data = await response.json();
        setalldata(data);
        setLoading(false); 
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const dellone = async (id) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + 'del/' + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Deleted record with ID:", id);
      setalldata(alldata.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (data) => {
    setEditId(data._id);
    setEditTask(data.Task);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTask("");
  };

  const saveEdit = async (id) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + 'update/' + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Task: editTask }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Updated record with ID:", id);

      // Update state immediately
      setalldata(
        alldata.map((item) =>
          item._id === id ? { ...item, Task: editTask } : item
        )
      );

      setEditId(null);
      setEditTask("");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
   if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {alldata.map((data) => (
        <div
          key={data._id}
          className="container flex bg-blue-300 mx-auto justify-around p-3 sm:flex-wrap"
        >
          <div>
            {editId === data._id ? (
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                className="w-200 max-lg:w-120 max-md:w-100 max-sm:w-45 bg-white p-1 rounded placeholder-blue-700 text-blue-800 font-bold"
              />
            ) : (
              <h1 className="w-200 max-lg:w-120 max-md:w-100 max-sm:w-45 bg-white p-1 rounded text-blue-700 font-bold">
                {data.Task}
              </h1>
            )}
          </div>

          <div className="flex gap-2">
            {editId === data._id ? (
              <>
                <button
                  onClick={() => saveEdit(data._id)}
                  className="bg-green-500 text-white p-1 rounded font-bold hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white p-1 rounded font-bold hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(data)}
                  className="bg-white text-blue-500 p-1 rounded cursor-pointer hover:bg-blue-500 hover:text-white font-bold shadow-sm"
                >
                 <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  onClick={() => dellone(data._id)}
                  className="bg-white text-blue-500 p-1 rounded cursor-pointer hover:bg-blue-500 hover:text-white font-bold shadow-sm"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Display;
