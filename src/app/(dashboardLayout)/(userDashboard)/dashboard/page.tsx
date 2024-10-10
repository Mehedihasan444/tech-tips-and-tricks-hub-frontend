import React from "react";
import { User, BarChart2, FileText, Activity, DollarSign, Users } from "lucide-react";

const DashboardPage = () => {
  return (
    // bg-gradient-to-r from-blue-100 to-teal-100
    <div className="min-h-screen  p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome back, John Doe! 👋
        </h2>
        <p className="text-lg text-gray-600">
          Here&apos;s an overview of your account and recent activities.
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <User className="text-teal-600 w-6 h-6 mr-2" />
            <h3 className="text-2xl font-semibold text-gray-800">Profile Overview</h3>
          </div>
          <p className="text-gray-600 mb-2">
            <strong>Name:</strong> John Doe
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> johndoe@example.com
          </p>
          <p className="text-gray-600">
            <strong>Member Since:</strong> January 2024
          </p>
        </div>

        {/* Analytics */}
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <BarChart2 className="text-teal-600 w-6 h-6 mr-2" />
            <h3 className="text-2xl font-semibold text-gray-800">Analytics</h3>
          </div>
          <p className="text-gray-600 mb-2">
            <strong>Total Posts:</strong> 24
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Followers:</strong> 120
          </p>
          <p className="text-gray-600">
            <strong>Total Upvotes:</strong> 340
          </p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Activity className="text-teal-600 w-6 h-6 mr-2" />
            <h3 className="text-2xl font-semibold text-gray-800">Recent Activity</h3>
          </div>
          <ul className="list-disc list-inside text-gray-600">
            <li>Published a new post on &quot;Tech Trends 2024&quot;</li>
            <li>Updated profile picture</li>
            <li>Gained 5 new followers</li>
          </ul>
        </div>

        {/* My Posts */}
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="text-teal-600 w-6 h-6 mr-2" />
            <h3 className="text-2xl font-semibold text-gray-800">My Posts</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Manage your posts, filter, and view their statistics.
          </p>
          <a
            href="/dashboard/myposts"
            className="text-teal-600 font-medium hover:underline hover:text-teal-800 transition duration-300"
          >
            Go to My Posts
          </a>
        </div>

        {/* Payments */}
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <DollarSign className="text-teal-600 w-6 h-6 mr-2" />
            <h3 className="text-2xl font-semibold text-gray-800">Payments</h3>
          </div>
          <p className="text-gray-600 mb-4">
            View your payment history and upcoming invoices.
          </p>
          <a
            href="/dashboard/payments"
            className="text-teal-600 font-medium hover:underline hover:text-teal-800 transition duration-300"
          >
            Go to Payments
          </a>
        </div>

        {/* Followed Activities */}
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Users className="text-teal-600 w-6 h-6 mr-2" />
            <h3 className="text-2xl font-semibold text-gray-800">Followed Activities</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Stay updated with the activities of the people you&apos;re following.
          </p>
          <a
            href="/dashboard/following"
            className="text-teal-600 font-medium hover:underline hover:text-teal-800 transition duration-300"
          >
            View Followed Activities
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
