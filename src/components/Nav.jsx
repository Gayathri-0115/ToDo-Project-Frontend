import React from 'react';

function Nav() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide drop-shadow-md">
          📝 To-Do List
        </h1>
        <span className="text-sm sm:text-base text-blue-100 italic">
          Stay organized. Stay productive.
        </span>
      </div>
    </nav>
  );
}

export default Nav;
