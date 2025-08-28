import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const mainMenuItems = [
    { 
      name: 'My Collection', 
      path: '/collection', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      description: 'Your saved books'
    },
    { 
      name: 'Favorites', 
      path: '/favorites', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Liked books'
    },
    { 
      name: 'Downloads', 
      path: '/downloads', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      ),
      description: 'Downloaded content'
    }
  ];

  const bottomMenuItem = { 
    name: 'Support', 
    path: '/support', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.458v3.542M12 18v3.542M20.458 12h-3.542M5.542 12H2" />
      </svg>
    ),
    description: 'Help & Support'
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed left-0 top-16 h-screen bg-white/95 backdrop-blur-md shadow-xl border-r border-gray-200 z-40 transition-all duration-300 ease-in-out ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="flex flex-col h-full">
        {/* Hamburger Toggle Button */}
        <div className="p-4 border-b border-gray-200 flex justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            aria-label="Toggle sidebar"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
              }`}></span>
              <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Sidebar Header - Only show when expanded */}
        {isOpen && (
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
            <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Your Library
            </h2>
            <p className="text-sm text-gray-600 mt-1 font-medium">Manage your reading collection</p>
          </div>
        )}

        {/* Main Navigation Menu */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {mainMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700'
              }`}
              title={!isOpen ? item.name : ''}
            >
              <span className={`${isActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-indigo-600'} ${isOpen ? 'mr-3' : 'mx-auto'}`}>
                {item.icon}
              </span>
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{item.name}</div>
                  <div className={`text-xs truncate ${
                    isActive(item.path) 
                      ? 'text-white/80' 
                      : 'text-gray-500 group-hover:text-indigo-500'
                  }`}>
                    {item.description}
                  </div>
                </div>
              )}
              {isActive(item.path) && isOpen && (
                <div className="w-2 h-2 bg-white rounded-full ml-2"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Professional Bottom Support Section - Balanced Position */}
        <div className="px-2 pb-24 pt-2 border-t border-gray-200 mt-auto">
          <Link
            to={bottomMenuItem.path}
            className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
              isActive(bottomMenuItem.path)
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700'
            }`}
            title={!isOpen ? bottomMenuItem.name : ''}
          >
            <span className={`${isActive(bottomMenuItem.path) ? 'text-white' : 'text-gray-500 group-hover:text-indigo-600'} ${isOpen ? 'mr-3' : 'mx-auto'}`}>
              {bottomMenuItem.icon}
            </span>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{bottomMenuItem.name}</div>
                <div className={`text-xs truncate ${
                  isActive(bottomMenuItem.path) 
                    ? 'text-white/80' 
                    : 'text-gray-500 group-hover:text-indigo-500'
                }`}>
                  {bottomMenuItem.description}
                </div>
              </div>
            )}
            {isActive(bottomMenuItem.path) && isOpen && (
              <div className="w-2 h-2 bg-white rounded-full ml-2"></div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;