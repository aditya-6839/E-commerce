import React from 'react';

export default function Navbar({ setToken }) {
  return (
    <div className='flex items-center justify-between py-2 px-[4%] bg-white shadow-sm'>
      
      {/* Admin Panel Logo */}
      <h1 className='text-2xl font-bold text-gray-800'>
        Outflair <span className='text-sm font-normal text-gray-500'>Admin</span>
      </h1>

      {/* Logout Button */}
      <button
        onClick={() => setToken("")}
        className='bg-red-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer font-medium hover:bg-red-700 transition-colors'
      >
        Logout
      </button>
    </div>
  )
}
