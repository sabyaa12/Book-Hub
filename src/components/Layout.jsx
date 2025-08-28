import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // ✅ Enhanced scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 50);

    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    setTimeout(() => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
    }, 150);

    // Close sidebar on mobile when navigating to new page
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      // Auto-close sidebar on mobile when screen size changes
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Handle sidebar toggle with responsive behavior
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Handle keyboard events for overlay
  const handleOverlayKeyDown = (e) => {
    if (e.key === 'Escape' && isMobile) {
      setSidebarOpen(false);
    }
  };

  // Handle body scroll prevention
  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen, isMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Fixed Navbar - Highest z-index */}
      <Navbar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        onToggleSidebar={handleSidebarToggle}
      />
      
      <div className="flex">
        {/* Sidebar - Medium z-index */}
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen}
          isMobile={isMobile}
        />
        
        {/* Main Content Container - Fully responsive */}
        <div className={`flex-1 min-h-screen transition-all duration-300 ease-in-out pt-16 ${
          // Desktop behavior
          !isMobile 
            ? (sidebarOpen ? 'ml-64' : 'ml-16')
            // Mobile behavior - full width always
            : 'ml-0'
        }`}>
          {/* Main Content Area */}
          <main 
            className={`min-h-screen transition-all duration-300 ${
              isMobile && sidebarOpen ? 'overflow-hidden' : ''
            }`}
            id="main-content"
          >
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
      
      {/* ✅ CRITICAL FIX: Mobile Sidebar Overlay - Lower z-index than sidebar */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 transition-all duration-300 lg:hidden"
          onClick={handleOverlayClick}
          onKeyDown={handleOverlayKeyDown}
          aria-label="Close sidebar"
          role="button"
          tabIndex={0}
        />
      )}
    </div>
  );
};

export default Layout;