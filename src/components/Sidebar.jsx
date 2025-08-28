import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const location = useLocation();

  const mainMenuItems = [
    { 
      name: 'My Collection', 
      path: '/collection', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      description: 'Your saved books'
    },
    { 
      name: 'Favorites', 
      path: '/favorites', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Liked books'
    },
    { 
      name: 'Downloads', 
      path: '/downloads', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: 'Help & Support'
  };

  const isActive = (path) => location.pathname === path;

  const handleToggle = () => {
    if (setIsOpen && typeof setIsOpen === 'function') {
      setIsOpen(!isOpen);
    }
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (isMobile && setIsOpen && typeof setIsOpen === 'function') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* ✅ FIXED: Proper Z-Index Hierarchy - Sidebar above overlay but below navbar */}
      <div className={`fixed left-0 top-16 h-screen bg-white/95 backdrop-blur-md shadow-xl border-r border-gray-200 z-40 transition-all duration-300 ease-in-out ${
        // Mobile behavior - slide in/out
        isMobile 
          ? (isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full')
          // Desktop behavior - resize
          : (isOpen ? 'w-64' : 'w-16')
      }`}>
        <div className="flex flex-col h-full">
          {/* Hamburger Toggle Button - Only show on desktop */}
          {!isMobile && (
            <div className="p-3 sm:p-4 border-b border-gray-200 flex justify-center">
              <button
                onClick={handleToggle}
                className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
                type="button"
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
          )}

          {/* Sidebar Header - Always show on mobile when open */}
          {(isOpen || isMobile) && (
            <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
              <h2 className="text-base sm:text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Your Library
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Manage your reading collection</p>
            </div>
          )}

          {/* Main Navigation Menu - Scrollable on mobile */}
          <nav className="flex-1 px-2 py-3 sm:py-4 space-y-1 overflow-y-auto">
            {mainMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={handleLinkClick}
                className={`flex items-center px-3 py-2.5 sm:py-3 rounded-xl transition-all duration-200 group ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700'
                }`}
                title={!isOpen && !isMobile ? item.name : ''}
                aria-label={`Navigate to ${item.name}`}
              >
                <span className={`${isActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-indigo-600'} ${isOpen || isMobile ? 'mr-3' : 'mx-auto'}`}>
                  {item.icon}
                </span>
                {(isOpen || isMobile) && (
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm sm:text-base truncate">{item.name}</div>
                    <div className={`text-xs sm:text-sm truncate ${
                      isActive(item.path) 
                        ? 'text-white/80' 
                        : 'text-gray-500 group-hover:text-indigo-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                )}
                {isActive(item.path) && (isOpen || isMobile) && (
                  <div className="w-2 h-2 bg-white rounded-full ml-2"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Support Section */}
          <div className="px-2 pb-20 sm:pb-24 pt-2 border-t border-gray-200 mt-auto">
            <Link
              to={bottomMenuItem.path}
              onClick={handleLinkClick}
              className={`flex items-center px-3 py-2.5 sm:py-3 rounded-xl transition-all duration-200 group ${
                isActive(bottomMenuItem.path)
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700'
              }`}
              title={!isOpen && !isMobile ? bottomMenuItem.name : ''}
              aria-label={`Navigate to ${bottomMenuItem.name}`}
            >
              <span className={`${isActive(bottomMenuItem.path) ? 'text-white' : 'text-gray-500 group-hover:text-indigo-600'} ${isOpen || isMobile ? 'mr-3' : 'mx-auto'}`}>
                {bottomMenuItem.icon}
              </span>
              {(isOpen || isMobile) && (
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm sm:text-base truncate">{bottomMenuItem.name}</div>
                  <div className={`text-xs sm:text-sm truncate ${
                    isActive(bottomMenuItem.path) 
                      ? 'text-white/80' 
                      : 'text-gray-500 group-hover:text-indigo-500'
                  }`}>
                    {bottomMenuItem.description}
                  </div>
                </div>
              )}
              {isActive(bottomMenuItem.path) && (isOpen || isMobile) && (
                <div className="w-2 h-2 bg-white rounded-full ml-2"></div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;