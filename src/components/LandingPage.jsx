// frontend/src/components/LandingPage.jsx
import React from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import ValidationDashboard from './ValidationDashboard';
import ClusterZoneMap from './ClusterZoneMap';
import RoleExplorer from './RoleExplorer';

const LandingPage = ({ dashboardData, graphData, identities }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation */}
      <Navbar />

      {/* Hero section */}
      <HeroBanner />

      {/* Main analytics content */}
      <main className="max-w-5xl mx-auto mt-8 space-y-6">
        <ValidationDashboard data={dashboardData} />
        <ClusterZoneMap nodes={graphData.nodes} links={graphData.links} />
        <RoleExplorer identities={identities} />
      </main>
    </div>
  );
};

export default LandingPage;