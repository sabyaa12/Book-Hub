import React, { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const popularSearches = [
    'React Programming', 'Data Structures', 'Machine Learning', 
    'Calculus', 'Physics', 'Chemistry'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for textbooks, research papers, academic resources..."
              className="w-full px-6 py-4 text-lg bg-transparent border-none outline-none text-gray-800 placeholder-gray-400"
              disabled={isLoading}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <span>Search</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Popular Searches */}
      <div className="mt-6 text-center">
        <p className="text-blue-800 text-sm mb-3">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {popularSearches.map((search) => (
            <button
              key={search}
              onClick={() => {
                setQuery(search);
                onSearch(search);
              }}
              className="px-4 py-2 bg-white bg-opacity-20 text-blue-600 rounded-full text-sm hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;