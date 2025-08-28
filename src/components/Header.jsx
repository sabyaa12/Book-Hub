import React from 'react';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white p-4 sm:p-6 lg:p-8 shadow-lg">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Logo/Brand Section - Responsive */}
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-lg sm:text-xl lg:text-2xl font-bold">📚</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight">
                            Book Finder
                        </h1>
                    </div>
                    
                    {/* Tagline/Description - Hidden on mobile, visible on larger screens */}
                    <div className="hidden sm:block text-center sm:text-right">
                        <p className="text-sm lg:text-base text-blue-100 font-medium">
                            Discover your next great read
                        </p>
                        <p className="text-xs lg:text-sm text-blue-200 mt-1">
                            Powered by Open Library
                        </p>
                    </div>
                </div>
                
                {/* Mobile tagline - Only visible on small screens */}
                <div className="sm:hidden text-center mt-3 pt-3 border-t border-blue-400">
                    <p className="text-sm text-blue-100 font-medium">
                        Discover your next great read
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;