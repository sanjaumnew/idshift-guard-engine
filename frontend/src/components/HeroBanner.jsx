// frontend/src/components/HeroBanner.jsx
import React from 'react';

const HeroBanner = () => (
  <section className="bg-slate-900 text-white py-6">
    <div className="flex flex-col items-center space-y-4">
      
      {/* Page header */}
      <h1 className="text-xl md:text-2xl font-bold text-center max-w-3xl">
        IDShift Guard™: Continuous detection of identity drift and anomalous access behavior
      </h1>

      {/* Hero banner image with reduced height */}
      <img
        src="/assets/guard-hero-banner.png"
        alt="IDShift Guard Hero Banner"
        className="w-full max-h-[250px] object-cover rounded-md shadow-md"
      />
    </div>
  </section>
);

export default HeroBanner;