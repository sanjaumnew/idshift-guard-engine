// frontend/src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/assets/favico.png"
          alt="GUARD Logo"
          className="h-10 w-auto"
        />
        <span className="text-xl font-bold text-gray-800">GUARD</span>
      </div>
      <div className="text-sm text-gray-500">Identity Risk Engine</div>
    </nav>
  );
};

export default Navbar;