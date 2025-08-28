import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ sidebarOpen, setSidebarOpen, onToggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // ✅ FIXED: Close ALL dropdowns when sidebar opens to prevent conflicts
  useEffect(() => {
    if (sidebarOpen) {
      setIsDropdownOpen(false);
      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
    }
  }, [sidebarOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // ✅ CRITICAL FIX: Completely ignore clicks when sidebar is open
      if (sidebarOpen) return;
      
      if (!event.target.closest('.dropdown-container') && !event.target.closest('[aria-label="Toggle sidebar"]')) {
        setIsDropdownOpen(false);
        setIsProfileOpen(false);
      }
    };

    // ✅ CRITICAL FIX: Only add listeners when sidebar is closed
    if ((isDropdownOpen || isProfileOpen) && !sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isProfileOpen, sidebarOpen]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Enhanced navigation handlers with scroll-to-top
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
    setIsMobileMenuOpen(false);
    // ✅ Scroll to top
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleLogoClick = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
    // ✅ Immediate scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
    // ✅ Immediate scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchClick = () => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const searchElement = document.getElementById('search-section');
        if (searchElement) {
          searchElement.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
              searchInput.focus();
            }
          }, 500);
        }
      }, 100);
    } else {
      const searchElement = document.getElementById('search-section');
      if (searchElement) {
        searchElement.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const searchInput = document.getElementById('search-input');
          if (searchInput) {
            searchInput.focus();
          }
        }, 500);
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleProfileDropdownToggle = (e) => {
    e.stopPropagation();
    // ✅ CRITICAL FIX: Block dropdown completely when sidebar is open
    if (sidebarOpen) return;
    
    setIsProfileOpen(!isProfileOpen);
    setIsDropdownOpen(false);
  };

  const handleCategoriesDropdownToggle = (e) => {
    e.stopPropagation();
    // ✅ CRITICAL FIX: Block dropdown completely when sidebar is open
    if (sidebarOpen) return;
    
    setIsDropdownOpen(!isDropdownOpen);
    setIsProfileOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeAllDropdowns = () => {
    setIsDropdownOpen(false);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  // ✅ FIXED: Profile link handlers with proper navigation
  const handleProfileLinkClick = (path) => {
    setIsProfileOpen(false);
    navigate(path);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleSignOut = () => {
    setIsProfileOpen(false);
    // Add your sign out logic here
    console.log('User signed out');
  };

  return (
    <>
      {/* Add CSS animations */}
      <style>{`
        @keyframes fadeInDropdown {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes slideDownMobile {
          from { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-fadeIn {
          animation: fadeInDropdown 0.2s ease-out forwards;
        }
        .animate-slideDown {
          animation: slideDownMobile 0.3s ease-out forwards;
        }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* ✅ Left side - Logo & SINGLE Sidebar Toggle */}
            <div className="flex items-center space-x-4">
              {/* ✅ FIXED: Single Sidebar Toggle Button - Only show when onToggleSidebar exists */}
              {onToggleSidebar && (
                <button
                  onClick={onToggleSidebar}
                  className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                  aria-label="Toggle sidebar"
                  type="button"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}

              {/* Logo */}
              <button 
                onClick={handleLogoClick} 
                className="flex items-center hover:opacity-80 transition-opacity"
                aria-label="Go to homepage"
                type="button"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      BookHub
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 block leading-none font-medium">Academic</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Center - Navigation (Desktop Only) */}
            <div className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={handleHomeClick}
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium relative group"
                aria-label="Go to home page"
                type="button"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              {/* Categories Dropdown */}
              <div className="relative dropdown-container">
                <button 
                  onClick={handleCategoriesDropdownToggle}
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium flex items-center relative group"
                  aria-label="Browse categories"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  type="button"
                >
                  Categories
                  <svg 
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                
                {/* ✅ CRITICAL FIX: Only show dropdown when sidebar is closed */}
                {isDropdownOpen && !sidebarOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-fadeIn">
                    <div className="py-2 grid grid-cols-2 gap-1 p-3 max-h-80 overflow-y-auto">
                      {categories.map((category) => (
                        <button
                          key={category.slug}
                          onClick={() => handleCategoryClick(category)}
                          className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors rounded-lg font-medium"
                          aria-label={`Browse ${category.name} books`}
                          type="button"
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
                aria-label="About page"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* ✅ Right side - CLEAN */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Button */}
              <button 
                onClick={handleSearchClick}
                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors group"
                title="Search books"
                aria-label="Search books"
                type="button"
              >
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Notifications - Hidden on mobile */}
              <button 
                className="hidden sm:block relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors group"
                title="Notifications"
                aria-label="View notifications"
                type="button"
              >
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                </svg>
                <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative dropdown-container">
                <button 
                  onClick={handleProfileDropdownToggle}
                  className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors group"
                  aria-label="User profile menu"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                  type="button"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                    <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <svg className={`hidden sm:block h-4 w-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* ✅ CRITICAL FIX: Only show profile dropdown when sidebar is closed */}
                {isProfileOpen && !sidebarOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-fadeIn">
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">John Doe</p>
                        <p className="text-xs text-gray-500">john.doe@email.com</p>
                      </div>
                      
                      {/* ✅ FIXED: Changed from Link to button to avoid nesting issues */}
                      <button 
                        onClick={() => handleProfileLinkClick('/profile')}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile
                        </span>
                      </button>
                      
                      <button 
                        onClick={() => handleProfileLinkClick('/collection')}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          My Collection
                        </span>
                      </button>
                      
                      <button 
                        onClick={() => handleProfileLinkClick('/downloads')}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6-6V4" />
                          </svg>
                          Downloads
                        </span>
                      </button>
                      
                      <button 
                        onClick={() => handleProfileLinkClick('/support')}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Help & Support
                        </span>
                      </button>
                      
                      <hr className="my-1" />
                      
                      {/* ✅ FIXED: Sign Out button - already correct */}
                      <button 
                        className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        onClick={handleSignOut}
                        type="button"
                      >
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
            </div>
          </div>
        </div>

        {/* ✅ CRITICAL FIX: COMPLETELY REMOVE OVERLAY WHEN SIDEBAR IS OPEN */}
        {/* This overlay was causing the blur - now it only shows for dropdowns when sidebar is closed */}
        {(isDropdownOpen || isProfileOpen) && !sidebarOpen && (
          <div 
            className="fixed inset-0 z-30" 
            onClick={closeAllDropdowns}
            aria-label="Close dropdown menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                closeAllDropdowns();
              }
            }}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;