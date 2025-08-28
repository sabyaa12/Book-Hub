import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Academic Book Finder</h1>
          
          <div className="prose prose-lg text-gray-600 space-y-6">
            <p>
              Academic Book Finder is a modern, student-focused platform designed to help college students 
              discover textbooks, research materials, and academic resources across various fields of study.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Mission</h2>
            <p>
              We understand the challenges students face when searching for reliable academic resources. 
              Our platform simplifies this process by providing access to millions of books through a 
              clean, intuitive interface designed specifically for the modern student experience.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Data Source</h2>
            <p>
              Our book database is powered by the <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">Open Library API</a>, 
              a collaborative project by the Internet Archive that provides access to millions of books worldwide. 
              This ensures our users have access to comprehensive, up-to-date information about academic texts, 
              research materials, and educational resources.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Search across 12 major academic fields</li>
              <li>Access to millions of books and academic resources</li>
              <li>Clean, minimal interface optimized for students</li>
              <li>Mobile-responsive design for studying on-the-go</li>
              <li>Curated suggestions for popular academic texts</li>
              <li>Real-time search with comprehensive results</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Academic Fields Covered</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-md">
                <span className="text-gray-700 font-medium">Computer Science</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <span className="text-gray-700 font-medium">Mathematics</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <span className="text-gray-700 font-medium">Physics</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <span className="text-gray-700 font-medium">Chemistry</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <span className="text-gray-700 font-medium">Biology</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <span className="text-gray-700 font-medium">Psychology</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <span className="text-gray-700 font-medium">History</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <span className="text-gray-700 font-medium">Literature</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <span className="text-gray-700 font-medium">Economics</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <span className="text-gray-700 font-medium">Engineering</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <span className="text-gray-700 font-medium">Business</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <span className="text-gray-700 font-medium">Philosophy</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Technology Stack</h2>
            <p>
              Built with modern web technologies including React 19, Vite, and Tailwind CSS, 
              ensuring fast performance and an exceptional user experience across all devices.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Open Source & Collaborative</h3>
              <p className="text-blue-700">
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