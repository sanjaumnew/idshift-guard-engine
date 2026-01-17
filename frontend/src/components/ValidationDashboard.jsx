// frontend/src/components/ValidationDashboard.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ValidationDashboard = ({ data = { validated: 0, exceptions: 0, pending: 0 } }) => {
  const chartData = {
    labels: ['Validated', 'Exceptions', 'Pending'],
    datasets: [
      {
        label: 'Identities',
        data: [data.validated, data.exceptions, data.pending],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} identities`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Validation Dashboard</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ValidationDashboard;