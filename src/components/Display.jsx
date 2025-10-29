import React, { useState, useEffect } from "react";

function Display() {
  const [alldata, setalldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "get");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setalldata(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dellone = async (id) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "del/" + id, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
      const response = await fetch(import.meta.env.VITE_API_URL + "update/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Task: editTask }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setalldata(
        alldata.map((item) =>
          item._id === id ? { ...item, Task: editTask } : item
        )
      );
      cancelEdit();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // 🌀 Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="w-14 h-14 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // 📭 Empty state
  if (alldata.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] bg-gradient-to-br from-blue-50 to-blue-100 text-center px-4">
        <div className="w-20 h-20 border-4 border-dashed border-blue-400 rounded-full flex items-center justify-center animate-bounce mb-4">
          <i className="fa-solid fa-list text-3xl text-blue-500"></i>
        </div>
        <h2 className="text-blue-700 font-bold text-2xl mb-2 tracking-wide">
          No Tasks Yet
        </h2>
        <p className="text-gray-600 text-sm max-w-sm">
          You haven’t added any tasks yet. Create one to get started.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-md transition"
        >
          Refresh
        </button>
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-4">
          {alldata.map((data) => (
            <div
              key={data._id}
              className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 border border-blue-100"
            >
              <div className="flex-1 min-w-[200px] mb-2 sm:mb-0">
                {editId === data._id ? (
                  <input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                    className="w-full bg-blue-50 text-blue-800 font-semibold p-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Edit task..."
                  />
                ) : (
                  <h1 className="text-blue-900 font-semibold text-lg tracking-wide bg-blue-50 p-2 rounded-md break-words shadow-sm">
                    {data.Task}
                  </h1>
                )}
              </div>

              <div className="flex gap-2 w-full sm:w-auto justify-end">
                {editId === data._id ? (
                  <>
                    <button
                      onClick={() => saveEdit(data._id)}
                      className="bg-green-500 text-white px-4 py-2 mx-2 rounded-md font-semibold hover:bg-green-600 shadow-sm transition cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-500 shadow-sm transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(data)}
                      className="bg-blue-100 text-blue-600 mx-2 p-2 rounded-md shadow-sm hover:bg-blue-600 hover:text-white transition cursor-pointer"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => dellone(data._id)}
                      className="bg-red-100 text-red-600 p-2 rounded-md shadow-sm hover:bg-red-600 hover:text-white transition cursor-pointer"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Display;
