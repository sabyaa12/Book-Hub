import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">📚 Academic Book Finder</h3>
            <p className="text-gray-300 leading-relaxed">
              Discover your next great read from millions of books using the Open Library API. 
              Built specifically for modern college students.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
              <li><a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Open Library</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Categories</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/category/computer-science" className="hover:text-blue-400 transition-colors">Computer Science</Link></li>
              <li><Link to="/category/mathematics" className="hover:text-blue-400 transition-colors">Mathematics</Link></li>
              <li><Link to="/category/physics" className="hover:text-blue-400 transition-colors">Physics</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Academic Book Finder. Built with React and powered by Open Library API.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;