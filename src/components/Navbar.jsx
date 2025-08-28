import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: 'Computer Science', slug: 'computer-science', search: 'computer science programming software' },
    { name: 'Mathematics', slug: 'mathematics', search: 'mathematics calculus algebra statistics' },
    { name: 'Physics', slug: 'physics', search: 'physics quantum mechanics thermodynamics' },
    { name: 'Chemistry', slug: 'chemistry', search: 'chemistry organic inorganic biochemistry' },
    { name: 'Biology', slug: 'biology', search: 'biology molecular genetics microbiology' },
    { name: 'Psychology', slug: 'psychology', search: 'psychology cognitive behavioral developmental' },
    { name: 'History', slug: 'history', search: 'history world ancient modern civilization' },
    { name: 'Literature', slug: 'literature', search: 'literature english classics poetry' },
    { name: 'Economics', slug: 'economics', search: 'economics microeconomics macroeconomics finance' },
    { name: 'Engineering', slug: 'engineering', search: 'engineering mechanical electrical civil' },
    { name: 'Business', slug: 'business', search: 'business management finance accounting' },
    { name: 'Philosophy', slug: 'philosophy', search: 'philosophy ethics logic metaphysics' }
  ];

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.slug}`, { 
      state: { 
        category: {
          name: category.name,
          search: category.search
        }
      }
    });
    setIsDropdownOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchClick = () => {
    // Navigate to home if not already there
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const searchElement = document.getElementById('search-section');
        if (searchElement) {
          searchElement.scrollIntoView({ behavior: 'smooth' });
          // Focus on search input after scroll
          setTimeout(() => {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
              searchInput.focus();
            }
          }, 500);
        }
      }, 100);
    } else {
      // Already on homepage, just scroll to search
      const searchElement = document.getElementById('search-section');
      if (searchElement) {
        searchElement.scrollIntoView({ behavior: 'smooth' });
        // Focus on search input after scroll
        setTimeout(() => {
          const searchInput = document.getElementById('search-input');
          if (searchInput) {
            searchInput.focus();
          }
        }, 500);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <button onClick={handleLogoClick} className="flex items-center hover:opacity-80 transition-opacity">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-3">
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    BookHub
                  </span>
                  <span className="text-sm text-gray-500 block leading-none font-medium">Academic</span>
                </div>
              </div>
            </button>
          </div>

          {/* Center - Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={handleHomeClick}
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            {/* Categories Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium flex items-center relative group"
              >
                Categories
                <svg className="ml-1 h-4 w-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                  <div className="py-2 grid grid-cols-2 gap-1 p-3 max-h-80 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category.slug}
                        onClick={() => handleCategoryClick(category)}
                        className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors rounded-lg font-medium"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/about"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button 
              onClick={handleSearchClick}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors group"
              title="Search books"
            >
              <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Notifications */}
            <button 
              className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors group"
              title="Notifications"
            >
              <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              </svg>
              <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <svg className={`h-4 w-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">John Doe</p>
                      <p className="text-xs text-gray-500">john.doe@email.com</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </span>
                    </Link>
                    <Link to="/collection" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        My Collection
                      </span>
                    </Link>
                    <Link to="/downloads" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6-6V4" />
                        </svg>
                        Downloads
                      </span>
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </span>
                    </Link>
                    <Link to="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Help & Support
                      </span>
                    </Link>
                    <hr className="my-1" />
                    <button className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {sidebarOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <button 
              onClick={handleHomeClick}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Home
            </button>
            <div className="px-3 py-2">
              <p className="text-sm font-semibold text-gray-500 mb-2">Categories</p>
              <div className="grid grid-cols-2 gap-1">
                {categories.slice(0, 6).map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => handleCategoryClick(category)}
                    className="text-left px-2 py-1 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded transition-colors"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            <Link 
              to="/about"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              About
            </Link>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(isDropdownOpen || isProfileOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsDropdownOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;