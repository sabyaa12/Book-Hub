import React from 'react';
import BookCard from './BookCard';

const RecommendedSection = ({ onBookClick }) => {
  const recommendedBooks = [
    {
      id: 'rec-1',
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      publishYear: '2008',
      coverUrl: 'https://covers.openlibrary.org/b/id/8566785-M.jpg',
      rating: 4.8,
      category: 'Programming'
    },
    {
      id: 'rec-2',
      title: 'Introduction to Statistical Learning',
      author: 'Gareth James',
      publishYear: '2013',
      coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
      rating: 4.7,
      category: 'Data Science'
    },
    {
      id: 'rec-3',
      title: 'Calculus: Early Transcendentals',
      author: 'James Stewart',
      publishYear: '2015',
      coverUrl: 'https://covers.openlibrary.org/b/id/8225261-M.jpg',
      rating: 4.6,
      category: 'Mathematics'
    },
    {
      id: 'rec-4',
      title: 'Campbell Biology',
      author: 'Jane B. Reece',
      publishYear: '2016',
      coverUrl: 'https://covers.openlibrary.org/b/id/7222335-M.jpg',
      rating: 4.9,
      category: 'Biology'
    }
  ];

  const handleBookClick = (book) => {
    console.log('📚 Recommended book clicked:', book);
    if (onBookClick && typeof onBookClick === 'function') {
      onBookClick(book);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mx-4 sm:mx-0">
      {/* Header Section - Responsive */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
          📈 Recommended for You
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0 leading-relaxed">
          Handpicked academic resources based on your study preferences and popular among students
        </p>
        <div className="w-16 sm:w-24 h-1 bg-indigo-600 mx-auto mt-3 sm:mt-4 rounded-full"></div>
      </div>
      
      {/* Books Grid - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {recommendedBooks.map((book) => (
          <div key={book.id} className="group">
            <BookCard 
              book={book} 
              onBookClick={handleBookClick}
            />
            
            {/* Rating and Category - Responsive */}
            <div className="mt-2 sm:mt-3 text-center">
              <div className="flex items-center justify-center space-x-1">
                <span 
                  className="text-yellow-400 text-sm sm:text-base"
                  role="img"
                  aria-label="Star rating"
                >
                  ⭐
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  {book.rating}
                </span>
                <span 
                  className="text-gray-400 hidden sm:inline"
                  aria-hidden="true"
                >
                  •
                </span>
                <span className="text-xs sm:text-sm text-gray-500">
                  {book.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* View More Button - Optional Enhancement */}
      <div className="text-center mt-6 sm:mt-8">
        <button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="button"
          aria-label="View more recommended books"
        >
          View More Recommendations
        </button>
      </div>
    </div>
  );
};

export default RecommendedSection;