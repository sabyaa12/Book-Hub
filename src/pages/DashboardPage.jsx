import React from 'react';

const DashboardPage = () => {
  const stats = [
    { name: 'Books Read', value: '24', icon: '📚', color: 'bg-blue-500' },
    { name: 'Favorites', value: '18', icon: '❤️', color: 'bg-red-500' },
    { name: 'Downloads', value: '12', icon: '⬇️', color: 'bg-purple-500' }
  ];

  const recentActivity = [
    { action: 'Added to collection', book: 'Clean Code', time: '2 hours ago' },
    { action: 'Completed reading', book: 'React Handbook', time: '1 day ago' },
    { action: 'Added to favorites', book: 'Data Structures', time: '3 days ago' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your reading overview.</p>
      </div>

      {/* Stats Grid - Hours Studied Removed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg text-white text-xl`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  <span className="font-medium">{activity.action}</span>: {activity.book}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;