import React, { useState } from 'react';

const DownloadsPage = () => {
  const [downloads] = useState([
    {
      id: 1,
      title: 'Introduction to Algorithms - Chapter 1',
      type: 'PDF',
      size: '2.4 MB',
      downloadDate: '2024-01-20',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Clean Code - Sample Chapter',
      type: 'PDF',
      size: '1.8 MB',
      downloadDate: '2024-01-18',
      status: 'completed'
    },
    {
      id: 3,
      title: 'React Handbook - Complete Guide',
      type: 'PDF',
      size: '5.2 MB',
      downloadDate: '2024-01-15',
      status: 'completed'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'downloading': return 'text-blue-600 bg-blue-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      {/* Header Section - Responsive */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
          <span className="mr-2 text-xl sm:text-2xl lg:text-3xl">⬇️</span>
          Downloads
        </h1>
        <p className="text-sm sm:text-base text-gray-600">Manage your downloaded books and documents</p>
      </div>

      {downloads.length === 0 ? (
        /* Empty State - Responsive */
        <div className="text-center py-12 sm:py-16 lg:py-20 bg-white rounded-xl shadow-md">
          <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">📥</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No downloads yet</h3>
          <p className="text-sm sm:text-base text-gray-600 px-4">Downloaded books and materials will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Table Header - Responsive */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Downloaded Files</h2>
          </div>
          
          {/* Downloads List - Responsive */}
          <div className="divide-y divide-gray-200">
            {downloads.map((download) => (
              <div key={download.id} className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  {/* File Info - Responsive */}
                  <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                    <div className="bg-red-100 p-2 rounded-lg flex-shrink-0">
                      <svg className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 text-sm sm:text-base line-clamp-1 sm:line-clamp-none" title={download.title}>
                        {download.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        <span>{download.type}</span>
                        <span className="mx-1">•</span>
                        <span>{download.size}</span>
                        <span className="hidden sm:inline">
                          <span className="mx-1">•</span>
                          <span>Downloaded on {download.downloadDate}</span>
                        </span>
                      </p>
                      {/* Mobile date display */}
                      <p className="text-xs text-gray-500 mt-1 sm:hidden">
                        Downloaded on {download.downloadDate}
                      </p>
                    </div>
                  </div>
                  
                  {/* Actions - Responsive */}
                  <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4 pl-10 sm:pl-0">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(download.status)} capitalize`}>
                      {download.status}
                    </span>
                    <div className="flex space-x-2 sm:space-x-3">
                      <button 
                        className="text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm font-medium transition-colors"
                        type="button"
                      >
                        Open
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-700 text-xs sm:text-sm transition-colors"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Download Stats - Responsive */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 sm:p-3 rounded-lg text-white text-lg sm:text-xl">
              <span role="img" aria-label="Statistics">📊</span>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{downloads.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-2 sm:p-3 rounded-lg text-white text-lg sm:text-xl">
              <span role="img" aria-label="Storage">💾</span>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">9.4 MB</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center">
            <div className="bg-purple-500 p-2 sm:p-3 rounded-lg text-white text-lg sm:text-xl">
              <span role="img" aria-label="Calendar">📅</span>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">This Month</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadsPage;