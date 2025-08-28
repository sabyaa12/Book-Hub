import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, isLoading, error, onBookClick }) => {
  // Loading state with responsive skeleton loaders
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        {[...Array(12)].map((_, index) => (
          <div key={`skeleton-${index}`} className="animate-pulse">
            {/* Skeleton book card with proper aspect ratio */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Skeleton cover image */}
              <div className="aspect-[3/4] bg-gray-200"></div>
              {/* Skeleton content */}
              <div className="p-3 sm:p-4 lg:p-5 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state with responsive design
  if (error) {
    return (
      <div className="text-center py-8 sm:py-12 lg:py-16 px-4">
        <div className="max-w-md mx-auto">
          {/* Error icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg 
              className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-4">
            Oops! Something went wrong
          </h3>
          
          <p className="text-red-500 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">
            {error}
          </p>
          
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-indigo-700 transition-colors duration-200 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="button"
            aria-label="Reload page to try again"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state with responsive design
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 lg:py-16 px-4">
        <div className="max-w-md mx-auto">
          {/* Empty state icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg 
              className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-4">
            No books found
          </h3>
          
          <p className="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed">
            Try searching with different keywords or browse our categories to discover new books.
          </p>
        </div>
      </div>
    );
  }

  // Books grid with fully responsive layout
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
      {books.map((book, index) => {
        // Generate unique key safely
        const uniqueKey = book?.id || book?.key || book?.isbn?.[0] || `book-${index}`;
        
        return (
          <BookCard 
            key={uniqueKey}
            book={book} 
            onBookClick={onBookClick}
          />
        );
      })}
    </div>
  );
};

export default BookList;