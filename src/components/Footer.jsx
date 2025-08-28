import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Newsletter subscription logic can be added here
    console.log('Newsletter subscription submitted');
  };

  const handleSocialClick = (platform) => {
    console.log(`${platform} social link clicked`);
  };

  return (
    <footer className="bg-gray-800 text-white py-8 sm:py-12 lg:py-16 mt-12 sm:mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="text-center sm:text-left lg:col-span-1">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">
              📚 Academic Book Finder
            </h3>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto sm:mx-0">
              Discover your next great read from millions of books using the Open Library API. 
              Built specifically for modern college students.
            </p>
            
            {/* Social Links - Mobile friendly */}
            <div className="flex justify-center sm:justify-start space-x-4 mt-4 sm:mt-6">
              <button 
                onClick={() => handleSocialClick('Twitter')}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 transform hover:scale-110 p-1"
                aria-label="Follow us on Twitter"
                type="button"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button 
                onClick={() => handleSocialClick('LinkedIn')}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 transform hover:scale-110 p-1"
                aria-label="Connect on LinkedIn"
                type="button"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button 
                onClick={() => handleSocialClick('GitHub')}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 transform hover:scale-110 p-1"
                aria-label="View on GitHub"
                type="button"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">
              Quick Links
            </h4>
            <nav>
              <ul className="space-y-2 sm:space-y-3 text-gray-300">
                <li>
                  <Link 
                    to="/" 
                    className="text-sm sm:text-base hover:text-blue-400 transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Home</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className="text-sm sm:text-base hover:text-blue-400 transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">About</span>
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://openlibrary.org" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm sm:text-base hover:text-blue-400 transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Open Library</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-sm sm:text-base hover:text-blue-400 transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Contact</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Popular Categories */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">
              Popular Categories
            </h4>
            <nav>
              <ul className="space-y-2 sm:space-y-3 text-gray-300">
                <li>
                  <Link 
                    to="/category/computer-science" 
                    className="text-sm sm:text-base hover:text-blue-400 transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="mr-2" role="img" aria-label="Computer Science">💻</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Computer Science</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/category/mathematics" 
                    className="text-sm sm:text-base hover:text-blue-400 transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="mr-2" role="img" aria-label="Mathematics">🔢</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Mathematics</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/category/physics" 
                    className="text-sm sm:text-base hover:text-blue-400 transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="mr-2" role="img" aria-label="Physics">⚛️</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Physics</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/category/literature" 
                    className="text-sm sm:text-base hover:text-blue-400 transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="mr-2" role="img" aria-label="Literature">📖</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Literature</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Newsletter Signup - Mobile optimized */}
        <div className="mt-8 sm:mt-12 lg:mt-16 py-6 sm:py-8 border-t border-gray-700">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4">
              📬 Stay Updated
            </h4>
            <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">
              Get notified about new book releases and features
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                required
                aria-label="Email address for newsletter"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base whitespace-nowrap transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            &copy; 2024 Academic Book Finder. Built with ❤️ using React and powered by Open Library API.
          </p>
          <nav className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</Link>
            <span className="text-gray-600" aria-hidden="true">•</span>
            <Link to="/terms" className="hover:text-blue-400 transition-colors duration-200">Terms of Service</Link>
            <span className="text-gray-600" aria-hidden="true">•</span>
            <Link to="/cookies" className="hover:text-blue-400 transition-colors duration-200">Cookie Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;