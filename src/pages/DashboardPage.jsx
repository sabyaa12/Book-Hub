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
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      {/* Header Section - Responsive */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600">Welcome back! Here's your reading overview.</p>
      </div>

      {/* Stats Grid - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
              <div className={`${stat.color} p-2 sm:p-3 rounded-lg text-white text-lg sm:text-xl flex items-center justify-center`}>
                <span role="img" aria-label={stat.name}>{stat.icon}</span>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity - Responsive */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Recent Activity</h2>
        <div className="space-y-3 sm:space-y-4">
          {recentActivity.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-start sm:items-center space-x-3 sm:space-x-4 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 mt-2 sm:mt-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-800">
                  <span className="font-medium">{activity.action}</span>: <span className="truncate">{activity.book}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1 sm:mt-0">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Activity Button - Mobile Responsive */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
          <button 
            className="w-full sm:w-auto text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
            type="button"
          >
            View all activity →
          </button>
        </div>
      </div>

      {/* Additional Responsive Stats Section */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Reading Progress Card - Responsive */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Reading Progress</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-600">This Month</span>
              <span className="text-xs sm:text-sm font-bold text-gray-900">8/10 books</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 sm:h-2.5 rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
            </div>
            <p className="text-xs text-gray-500">2 more books to reach your monthly goal!</p>
          </div>
        </div>

        {/* Quick Actions Card - Responsive */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <button 
              className="flex items-center justify-center space-x-2 p-2 sm:p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-xs sm:text-sm font-medium text-blue-700"
              type="button"
            >
              <span>📖</span>
              <span>Browse Books</span>
            </button>
            <button 
              className="flex items-center justify-center space-x-2 p-2 sm:p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 text-xs sm:text-sm font-medium text-green-700"
              type="button"
            >
              <span>⭐</span>
              <span>Rate Books</span>
            </button>
            <button 
              className="flex items-center justify-center space-x-2 p-2 sm:p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 text-xs sm:text-sm font-medium text-purple-700"
              type="button"
            >
              <span>📝</span>
              <span>Write Review</span>
            </button>
            <button 
              className="flex items-center justify-center space-x-2 p-2 sm:p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200 text-xs sm:text-sm font-medium text-orange-700"
              type="button"
            >
              <span>🎯</span>
              <span>Set Goals</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;