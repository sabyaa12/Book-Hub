import React from 'react';
import BookCard from './BookCard';

const SuggestedBooks = ({ onBookClick }) => {
  // Academic and study-focused suggested books
  const suggestedBooks = [
    {
      id: '/works/OL1234567W',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      publishYear: '2009',
      coverUrl: 'https://covers.openlibrary.org/b/id/8566785-M.jpg'
    },
    {
      id: '/works/OL2345678W',
      title: 'Calculus: Early Transcendentals',
      author: 'James Stewart',
      publishYear: '2015',
      coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg'
    },
    {
      id: '/works/OL3456789W',
      title: 'Campbell Biology',
      author: 'Jane B. Reece',
      publishYear: '2016',
      coverUrl: 'https://covers.openlibrary.org/b/id/8225261-M.jpg'
    },
    {
      id: '/works/OL4567890W',
      title: 'Principles of Economics',
      author: 'N. Gregory Mankiw',
      publishYear: '2017',
      coverUrl: 'https://covers.openlibrary.org/b/id/7222335-M.jpg'
    },
    {
      id: '/works/OL5678901W',
      title: 'Chemistry: The Central Science',
      author: 'Theodore L. Brown',
      publishYear: '2017',
      coverUrl: 'https://covers.openlibrary.org/b/id/10521270-M.jpg'
    },
    {
      id: '/works/OL6789012W',
      title: 'Physics for Scientists and Engineers',
      author: 'Raymond A. Serway',
      publishYear: '2018',
      coverUrl: 'https://covers.openlibrary.org/b/id/8225454-M.jpg'
    },
    {
      id: '/works/OL7890123W',
      title: 'Psychology: The Science of Mind',
      author: 'Michael W. Passer',
      publishYear: '2016',
      coverUrl: 'https://covers.openlibrary.org/b/id/8567239-M.jpg'
    },
    {
      id: '/works/OL8901234W',
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      publishYear: '1988',
      coverUrl: 'https://covers.openlibrary.org/b/id/6979861-M.jpg'
    }
  ];

  const handleBookClick = (book) => {
    console.log('📚 Suggested book clicked:', book);
    if (onBookClick && typeof onBookClick === 'function') {
      onBookClick(book);
    }
  };

  return (
    <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section - Fully Responsive */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          📚 Popular Academic Books
        </h2>
        <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
          Essential textbooks and references for college students
        </p>
        <div className="w-16 sm:w-24 h-1 bg-indigo-600 mx-auto mt-3 sm:mt-4 rounded-full"></div>
      </div>
      
      {/* Books Grid - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {suggestedBooks.map((book) => (
          <div key={book.id} className="group">
            <BookCard 
              book={book} 
              onBookClick={handleBookClick}
            />
          </div>
        ))}
      </div>
      
      {/* View More Button - Optional Enhancement */}
      <div className="text-center mt-6 sm:mt-8 lg:mt-12">
        <button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-lg font-medium text-sm sm:text-base lg:text-lg transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="button"
          aria-label="View more popular academic books"
        >
          Explore More Books
        </button>
      </div>
    </div>
  );
};

export default SuggestedBooks;