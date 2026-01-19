// frontend/src/components/LandingPage.jsx
import React from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import ValidationDashboard from './ValidationDashboard';
import ClusterZoneMap from './ClusterZoneMap';
import RoleExplorer from './RoleExplorer';

const LandingPage = ({
  dashboardData = { validated: 0, exceptions: 0, pending: 0 },
  graphData = { nodes: [], links: [] },
  identities = []
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Top Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroBanner />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">

        {/* Validation Dashboard */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Identity Risk Validation Summary
          </h2>
          <ValidationDashboard data={dashboardData} />
        </section>

        {/* Cluster Zone Map */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Cross-Platform Identity Risk Clusters
          </h2>

          {graphData?.nodes?.length ? (
            <ClusterZoneMap nodes={graphData.nodes} links={graphData.links} />
          ) : (
            <div className="text-slate-500 text-sm">
              Interactive risk map will appear once data is connected.
            </div>
          )}
        </section>

        {/* Role Explorer */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Identity Role Explorer
          </h2>

          {identities?.length ? (
            <RoleExplorer identities={identities} />
          ) : (
            <div className="text-slate-500 text-sm">
              Connect identity sources to explore role relationships.
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-sm">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <span>© {new Date().getFullYear()} IDShift — Guard Platform</span>
          <span>Cloud Identity Risk Intelligence</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
