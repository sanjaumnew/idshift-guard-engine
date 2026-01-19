import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left: Logo + Brand */}
        <div className="flex items-center space-x-3">
          <img
            src={`${process.env.PUBLIC_URL}/assets/guard-logo-transparent.png`}
            alt="IDShift Guard Logo"
            className="h-8 w-auto"
          />
          <span className="text-lg font-semibold text-white tracking-wide">
            IDShift Guard™
          </span>
        </div>

        {/* Center: Tagline (hidden on mobile) */}
        <div className="hidden md:block text-sm text-slate-300">
          Continuous detection of identity drift & anomalous access behavior
        </div>

        {/* Right: Action Button */}
        <div>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md font-medium shadow">
            Request Demo
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
