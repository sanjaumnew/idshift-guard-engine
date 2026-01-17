import React, { useEffect, useMemo, useState } from 'react';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/data/guardSchema.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setSchema(json);
      } catch (e) {
        setError(`Failed to load GuardSchema: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const dashboardData = useMemo(() => {
    if (!schema?.summary) return { validated: 0, exceptions: 0, pending: 0 };
    const { actionsTaken = {} } = schema.summary;
    return {
      validated: actionsTaken.autoReduced ?? 0,
      exceptions: actionsTaken.escalated ?? 0,
      pending: (schema.identities || []).filter(i =>
        i.status === 'underReview' || i.status === 'detected'
      ).length
    };
  }, [schema]);

  const graphData = useMemo(() => {
    const identities = schema?.identities || [];
    const policies = schema?.policiesApplied || [];
    const platforms = new Map();

    identities.forEach(i => {
      const p = i.attributes?.platform || 'Unspecified';
      if (!platforms.has(p)) {
        platforms.set(p, { id: p, status: i.status });
      }
    });

    const nodes = Array.from(platforms.values());
    const links = [];

    policies.forEach(pol => {
      const targets = (pol.appliedTo || [])
        .map(id => identities.find(i => i.identityId === id))
        .filter(Boolean);
      for (let a = 0; a < targets.length; a++) {
        for (let b = a + 1; b < targets.length; b++) {
          const pa = targets[a].attributes?.platform || 'Unspecified';
          const pb = targets[b].attributes?.platform || 'Unspecified';
          if (pa !== pb) links.push({ source: pa, target: pb });
        }
      }
    });

    return { nodes, links };
  }, [schema]);

  if (loading) {
    return <div className="max-w-5xl mx-auto mt-8 p-4">Loading audit-ready visuals…</div>;
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="App">
      <LandingPage
        dashboardData={dashboardData}
        graphData={graphData}
        identities={schema.identities || []}
      />
    </div>
  );
}

export default App;