// frontend/src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left: Brand name only */}
      <span className="text-xl font-bold text-gray-800 tracking-wide">
        IDShift Guard™
      </span>

      {/* Right: Tagline */}
      <div className="text-sm font-medium text-gray-600">
        Continuous detection of identity drift and anomalous access behavior
      </div>
    </nav>
  );
};

export default Navbar;