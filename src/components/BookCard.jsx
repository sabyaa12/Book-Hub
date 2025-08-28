import React from 'react';

const BookCard = ({ book, onBookClick }) => {
  const handleClick = () => {
    console.log('📚 BookCard clicked:', book);
    if (onBookClick) {
      onBookClick(book);
    } else {
      console.warn('⚠️ No onBookClick handler provided to BookCard');
    }
  };

  // Get cover image URL with better error handling
  const getCoverUrl = () => {
    if (book?.coverUrl) return book.coverUrl;
    if (book?.cover_i) return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    const fallbackText = book?.title?.slice(0, 20) || 'Book';
    return `https://via.placeholder.com/200x300/6366f1/ffffff?text=${encodeURIComponent(fallbackText)}`;
  };

  // Handle image error with better fallback
  const handleImageError = (e) => {
    const fallbackText = book?.title?.slice(0, 20) || 'Book';
    e.target.src = `https://via.placeholder.com/200x300/6366f1/ffffff?text=${encodeURIComponent(fallbackText)}`;
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full max-w-sm mx-auto group"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${book?.title || 'book'}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Book Cover - Enhanced responsive aspect ratio */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={getCoverUrl()}
          alt={`Cover of ${book?.title || 'book'}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={handleImageError}
          loading="lazy"
        />
        
        {/* Enhanced hover overlay with better responsive design */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
          <span className="text-white font-semibold text-xs sm:text-sm lg:text-base px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            View Details
          </span>
        </div>
        
        {/* Loading placeholder for better UX */}
        <div className="absolute inset-0 bg-gray-200 animate-pulse hidden" id="loading-placeholder">
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
        </div>
      </div>

      {/* Book Details - Enhanced responsive design */}
      <div className="p-3 sm:p-4 lg:p-5 space-y-2 sm:space-y-3">
        {/* Title - Better responsive typography */}
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg xl:text-xl mb-1 sm:mb-2 line-clamp-2 leading-tight transition-colors group-hover:text-indigo-600">
          {book?.title || 'Untitled'}
        </h3>
        
        {/* Author - Enhanced responsive design */}
        <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-2 sm:mb-3 line-clamp-1 transition-colors">
          <span className="text-gray-400">by</span> {book?.author || book?.author_name?.[0] || 'Unknown Author'}
        </p>
        
        {/* Publication year and additional info - Better responsive layout */}
        <div className="flex items-center justify-between pt-1 sm:pt-2">
          {/* Publication year badge */}
          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
            {book?.first_publish_year || book?.publishYear || 'Unknown'}
          </span>
          
          {/* Book indicator - Enhanced responsive visibility */}
          <div className="hidden sm:flex items-center space-x-1 text-gray-400 group-hover:text-indigo-500 transition-colors">
            <svg 
              className="w-3 h-3 sm:w-4 sm:h-4" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 5a1 1 0 000 2h6a1 1 0 100-2H7zm0 3a1 1 0 000 2h6a1 1 0 100-2H7z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-xs sm:text-sm font-medium">Book</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;