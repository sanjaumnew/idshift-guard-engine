import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const StatCard = ({ title, value, color }) => (
  <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm text-center">
    <div className="text-sm text-slate-500">{title}</div>
    <div className="text-2xl font-semibold" style={{ color }}>{value}</div>
  </div>
);

const ValidationDashboard = ({ data = { validated: 0, exceptions: 0, pending: 0 } }) => {

  const chartData = {
    labels: ['Validated', 'Exceptions', 'Pending'],
    datasets: [
      {
        data: [data.validated, data.exceptions, data.pending],
        backgroundColor: ['#16a34a', '#f59e0b', '#dc2626'],
        borderRadius: 6,
        barThickness: 50
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} identities`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { color: '#e2e8f0' }
      }
    }
  };

  return (
    <div className="space-y-6">

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Validated" value={data.validated} color="#16a34a" />
        <StatCard title="Exceptions" value={data.exceptions} color="#f59e0b" />
        <StatCard title="Pending Review" value={data.pending} color="#dc2626" />
      </div>

      {/* Chart */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Identity Validation Overview
        </h3>

        <div className="h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

    </div>
  );
};

export default ValidationDashboard;
