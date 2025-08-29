import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery, isSearching = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch(''); // Clear search results
    }
    // Focus back to input after clearing
    setTimeout(() => {
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.focus();
    }, 100);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  // ✅ ENHANCED: Popular search handler that triggers search
  const handlePopularSearchClick = (term) => {
    setSearchQuery(term);
    if (onSearch) {
      onSearch(term); // Actually search for the term
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        {/* Search Input Container */}
        <div className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
          isFocused 
            ? 'border-indigo-500 shadow-xl ring-4 ring-indigo-500/20' 
            : 'border-gray-200 hover:border-gray-300'
        }`}>
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Input Field */}
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for academic books, authors, subjects..."
            className="w-full pl-14 pr-20 py-4 text-lg bg-transparent rounded-2xl focus:outline-none placeholder-gray-500"
            autoComplete="off"
          />

          {/* Clear Button - Show when there's text */}
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
              aria-label="Clear search"
              title="Clear search"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Search Button with Loading State */}
          <button
            type="submit"
            disabled={!searchQuery.trim() || isSearching}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center ${
              searchQuery.trim() && !isSearching
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <span>Searching...</span>
              </>
            ) : (
              'Search'
            )}
          </button>
        </div>

        {/* Search Stats - Show when there's a query */}
        {searchQuery && (
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-600">
              {isSearching ? 'Searching for:' : 'Search term:'} 
              <span className="font-semibold text-indigo-600 ml-1">"{searchQuery}"</span>
            </p>
          </div>
        )}
      </form>

      {/* Popular Searches */}
      {!searchQuery && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Computer Science', 'Mathematics', 'Physics', 'Engineering', 'Biology', 'Chemistry'].map((term) => (
              <button
                key={term}
                onClick={() => handlePopularSearchClick(term)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;