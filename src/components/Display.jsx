import React, { useState, useEffect } from 'react'

function Display() {

    const [alldata, setalldata] = useState([])

    // Fetch all data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL+'get');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setalldata(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Delete one record
    const dellone = async (id) => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL+'del/'+id, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log("Deleted record with ID:", id);
            location.reload(); // refresh page (optional)
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };


    return (
        <div>
            {
                alldata.map(data => (
                    <div
                        key={data._id}   // ✅ Add a unique key here
                        className="container flex bg-blue-300 mx-auto justify-around p-3 sm:flex-wrap"
                    >
                        <div>
                            <h1 className='w-200 max-lg:w-120 max-md:w-100 max-sm:w-45 bg-white p-1 rounded text-blue-700 font-bold'>
                                {data.Task}
                            </h1>
                        </div>
                        <div>
                            <button
                                onClick={() => { dellone(data._id) }}
                                className='bg-white text-blue-500 p-1  rounded cursor-pointer hover:bg-blue-500 hover:text-white font-bold shadow-sm'
                            >
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}

export default Display