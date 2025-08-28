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
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">⬇️ Downloads</h1>
        <p className="text-gray-600">Manage your downloaded books and documents</p>
      </div>

      {downloads.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📥</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No downloads yet</h3>
          <p className="text-gray-600">Downloaded books and materials will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Downloaded Files</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {downloads.map((download) => (
              <div key={download.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{download.title}</h3>
                      <p className="text-sm text-gray-600">
                        {download.type} • {download.size} • Downloaded on {download.downloadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(download.status)}`}>
                      {download.status}
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                        Open
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm">
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

      {/* Download Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg text-white text-xl">
              📊
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{downloads.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg text-white text-xl">
              💾
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">9.4 MB</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg text-white text-xl">
              📅
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadsPage;