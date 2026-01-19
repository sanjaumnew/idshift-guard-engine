import React from 'react';

const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden">
      
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bg-pattern.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">

        {/* Left: Text Content */}
        <div className="flex-1 text-center md:text-left">
          
          {/* Logo */}
          <img
            src={`${process.env.PUBLIC_URL}/assets/guard-logo-transparent.png`}
            alt="IDShift Guard Logo"
            className="h-14 mb-6 mx-auto md:mx-0"
          />

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Continuous Detection of Identity Drift & Anomalous Access
          </h1>

          <p className="mt-4 text-slate-300 text-lg max-w-xl mx-auto md:mx-0">
            Guard by IDShift delivers cloud-scale identity risk intelligence —
            scan, reduce, and guard identity threats across your enterprise.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium shadow">
              Request Demo
            </button>
            <button className="px-6 py-3 border border-slate-400 text-slate-200 rounded-md hover:border-white">
              View Documentation
            </button>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="flex-1">
          <img
            src={`${process.env.PUBLIC_URL}/assets/guard-hero-banner.png`}
            alt="IDShift Guard Platform"
            className="w-full rounded-xl shadow-2xl border border-slate-700"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
