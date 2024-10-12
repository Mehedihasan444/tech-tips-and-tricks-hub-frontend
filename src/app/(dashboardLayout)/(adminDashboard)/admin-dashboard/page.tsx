"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import PageTitle from '../../components/_page-title/PageTitle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for demonstration
const data = {
  labels: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04'],
  datasets: [
    {
      label: 'Readers',
      data: [1000, 2000, 500, 3000],
      borderColor: '#8a2be2',
      backgroundColor: '#8a2be2',
      borderWidth: 2,
      fill: false,
      tension: 0.1,
    },
  ],
};

const reactionsData = {
  labels: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04'],
  datasets: [
    {
      label: 'Reactions',
      data: [150, 200, 50, 250],
      backgroundColor: '#66bb6a',
    },
  ],
};

const commentsData = {
  labels: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04'],
  datasets: [
    {
      label: 'Comments',
      data: [30, 40, 10, 50],
      backgroundColor: '#ffca28',
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="p-6  ">
      <PageTitle title='Analytics Dashboard' ></PageTitle>

      <div className="flex text-default-900 justify-between mb-6 gap-5">
        <div className="flex-1 bg-default-50 text-center p-4  rounded-lg shadow">
          <h3 className="text-lg font-bold">Readers</h3>
          <p className="text-2xl font-semibold">172,957</p>
        </div>
        <div className="flex-1 bg-default-50 text-center p-4  rounded-lg shadow">
          <h3 className="text-lg font-bold">Reactions</h3>
          <p className="text-2xl font-semibold">384</p>
        </div>
        <div className="flex-1 bg-default-50 text-center p-4  rounded-lg shadow">
          <h3 className="text-lg font-bold">Comments</h3>
          <p className="text-2xl font-semibold">41</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Readers Summary */}
        <div className=" p-4 bg-default-50 text-default-900 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Readers Summary</h3>
          <Line data={data} options={{ responsive: true }} />
        </div>

        {/* Reactions Summary */}
        <div className=" p-4 bg-default-50 text-default-900 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Reactions Summary</h3>
          <Bar data={reactionsData} options={{ responsive: true }} />
        </div>

        {/* Comments Summary */}
        <div className=" p-4 bg-default-50 text-default-900 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Comments Summary</h3>
          <Bar data={commentsData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
