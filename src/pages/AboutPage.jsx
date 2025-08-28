import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
            About Academic Book Finder
          </h1>
          
          <div className="prose prose-sm sm:prose-base lg:prose-lg text-gray-600 space-y-4 sm:space-y-6 max-w-none">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
              Academic Book Finder is a modern, student-focused platform designed to help college students 
              discover textbooks, research materials, and academic resources across various fields of study.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4">
              Our Mission
            </h2>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
              We understand the challenges students face when searching for reliable academic resources. 
              Our platform simplifies this process by providing access to millions of books through a 
              clean, intuitive interface designed specifically for the modern student experience.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4">
              Data Source
            </h2>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
              Our book database is powered by the{' '}
              <a 
                href="https://openlibrary.org" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
              >
                Open Library API
              </a>, 
              a collaborative project by the Internet Archive that provides access to millions of books worldwide. 
              This ensures our users have access to comprehensive, up-to-date information about academic texts, 
              research materials, and educational resources.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base lg:text-lg">
              <li className="leading-relaxed">Search across 12 major academic fields</li>
              <li className="leading-relaxed">Access to millions of books and academic resources</li>
              <li className="leading-relaxed">Clean, minimal interface optimized for students</li>
              <li className="leading-relaxed">Mobile-responsive design for studying on-the-go</li>
              <li className="leading-relaxed">Curated suggestions for popular academic texts</li>
              <li className="leading-relaxed">Real-time search with comprehensive results</li>
            </ul>
            
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4">
              Academic Fields Covered
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
                <span className="text-gray-700 font-medium text-sm sm:text-base">Computer Science</span>
              </div>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
                <span className="text-gray-700 font-medium text-sm sm:text-base">Mathematics</span>
              </div>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
                <span className="text-gray-700 font-medium text-sm sm:text-base">Physics</span>
              </div>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
                <span className="text-gray-700 font-medium text-sm sm:text-base">Chemistry</span>
              </div>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
                <span className="text-gray-700 font-medium text-sm sm:text-base">Biology</span>
              </div>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
                <span className="text-gray-700 font-medium text-sm sm:text-base">Psychology</span>
              </div>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
                <span className="text-gray-700 font-medium text-sm sm:text-base">History</span>
              </div>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
                <span className="text-gray-700 font-medium text-sm sm:text-base">Literature</span>
              </div>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
                <span className="text-gray-700 font-medium text-sm sm:text-base">Economics</span>
              </div>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
                <span className="text-gray-700 font-medium text-sm sm:text-base">Engineering</span>
              </div>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
                <span className="text-gray-700 font-medium text-sm sm:text-base">Business</span>
              </div>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
                <span className="text-gray-700 font-medium text-sm sm:text-base">Philosophy</span>
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4">
              Technology Stack
            </h2>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
              Built with modern web technologies including React 19, Vite, and Tailwind CSS, 
              ensuring fast performance and an exceptional user experience across all devices.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8">
              <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-2 sm:mb-3">
                Open Source & Collaborative
              </h3>
              <p className="text-blue-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                This project leverages open-source technologies and data sources to provide free access 
                to academic resources for students worldwide. We believe education should be accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;