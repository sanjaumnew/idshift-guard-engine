import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import schema from '../data/guardSchema.json';

const ValidationDashboard = ({ data }) => {
  const chartData = {
    labels: ['Validated', 'Exceptions', 'Pending'],
    datasets: [
      {
        label: 'Guard Engine Status',
        data: [data.validated, data.exceptions, data.pending],
        backgroundColor: ['#4ade80', '#f87171', '#facc15'],
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Validation Dashboard</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ValidationDashboard;