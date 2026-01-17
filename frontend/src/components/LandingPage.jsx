// frontend/src/components/LandingPage.jsx
import React from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import ValidationDashboard from './ValidationDashboard';
import ClusterZoneMap from './ClusterZoneMap';
import RoleExplorer from './RoleExplorer';

const LandingPage = ({ dashboardData = { validated: 0, exceptions: 0, pending: 0 }, graphData = { nodes: [], links: [] }, identities = [] }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation */}
      <Navbar />

      {/* Hero section */}
      <HeroBanner />

      {/* Main analytics content */}
      <main className="max-w-5xl mx-auto mt-8 space-y-6">
        <ValidationDashboard data={dashboardData} />

        {/* Guard against undefined graphData */}
        {graphData?.nodes && graphData?.links ? (
          <ClusterZoneMap nodes={graphData.nodes} links={graphData.links} />
        ) : (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            Graph data not available yet…
          </div>
        )}

        {/* Guard against undefined identities */}
        {identities?.length ? (
          <RoleExplorer identities={identities} />
        ) : (
          <div className="p-4 bg-gray-100 border border-gray-200 rounded">
            No identities loaded yet…
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingPage;