import React from 'react'

function Nav() {
  return (
    <div>
        <div className="flex bg-blue-500 text-white justify-between font-bold p-3">
            <div>
               <h1>TASK MANAGER</h1>                
            </div>
            <div className="flex space-x-5  ">
                <h1 className='cursor-pointer hover:bg-white hover:text-blue-500 hover:rounded hover:px-1'>Home</h1>
                <h1 className='cursor-pointer hover:bg-white hover:text-blue-500 hover:rounded hover:px-1'>Add</h1>
                <h1 className='cursor-pointer hover:bg-white hover:text-blue-500 hover:rounded hover:px-1'>Display</h1>
            </div>
        </div>
    </div>
  )
}

export default Nav