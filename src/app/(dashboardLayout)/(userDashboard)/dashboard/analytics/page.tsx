"use client";

import React from "react";
import { Line } from "react-chartjs-2"; 
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, BarElement } from "chart.js"; // Import necessary components
import { Card, CardBody, CardHeader } from "@nextui-org/react";

// Register necessary components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, BarElement);

const AnalyticsPage = () => {
  // Sample data for charts
  const engagementData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "User Engagement",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  const postStatsData = {
    labels: ["Post A", "Post B", "Post C", "Post D"],
    datasets: [
      {
        label: "Post Views",
        data: [120, 190, 30, 50],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 bg-default-50  rounded-lg">
      <h1 className="text-2xl mb-6  border-l-5 border-primary font-bold pl-5">User Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>User Engagement Over Time</CardHeader>
          <CardBody>
            <Line data={engagementData} options={{ responsive: true }} />
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <CardHeader>Post Statistics</CardHeader>
            <Bar data={postStatsData} options={{ responsive: true }} />
          </CardBody>
        </Card>
      </div>

      <div className="mt-8 flex gap-5 justify-between items-center">
        <Card className="flex-1">
          <CardBody>
            <CardHeader>Total Posts</CardHeader>
            <h3 className="text-2xl text-center font-bold">150</h3>
          </CardBody>
        </Card>
        
        <Card className="flex-1">
          <CardBody>
            <CardHeader>Total Comments</CardHeader>
            <h3 className="text-2xl text-center font-bold">500</h3>
          </CardBody>
        </Card>
        
        <Card className="flex-1">
          <CardBody>
            <CardHeader>Total Likes</CardHeader>
            <h3 className="text-2xl text-center font-bold">1,200</h3>
          </CardBody>
        </Card>
        <Card className="flex-1">
          <CardBody>
            <CardHeader>Total Dislikes</CardHeader>
            <h3 className="text-2xl text-center font-bold">200</h3>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
