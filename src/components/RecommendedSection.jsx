import React from 'react';
import BookCard from './BookCard';

const RecommendedSection = () => {
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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          📈 Recommended for You
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Handpicked academic resources based on your study preferences and popular among students
        </p>
        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedBooks.map((book) => (
          <div key={book.id} className="group">
            <BookCard book={book} />
            <div className="mt-3 text-center">
              <div className="flex items-center justify-center space-x-1">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm font-medium text-gray-700">{book.rating}</span>
                <span className="text-xs text-gray-500">• {book.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSection;