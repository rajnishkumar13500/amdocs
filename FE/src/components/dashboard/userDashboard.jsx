import React from 'react';

const UserDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Course Progress */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Current Courses</p>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <span className="text-sm">Completed Python Basics Module</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="text-sm">Started Web Development Course</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Resume Learning
            </button>
            <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
