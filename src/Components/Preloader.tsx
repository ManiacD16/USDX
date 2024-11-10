// src/Preloader.js
// import React from 'react';
// import logo from './Images/logo.png'; // Update this path to your logo

const Preloader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      {" "}
      {/* bg-gradient-to-r from-black via-[#2A2A00] to-[#4B4B00] */}
      <div className="relative flex items-center">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 bg-black border-white"></div>

          {/* <img
          src={logo}
          alt="Logo"
          className="absolute h-10 w-10"
        /> */}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
