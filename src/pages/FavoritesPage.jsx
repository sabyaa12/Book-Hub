import React, { useState } from 'react';
import BookCard from '../components/BookCard';

const FavoritesPage = () => {
  const [favorites] = useState([
    {
      id: 'fav-1',
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      publishYear: '2008',
      coverUrl: 'https://covers.openlibrary.org/b/id/8566785-M.jpg'
    },
    {
      id: 'fav-2',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      publishYear: '2009',
      coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg'
    },
    {
      id: 'fav-3',
      title: 'Calculus: Early Transcendentals',
      author: 'James Stewart',
      publishYear: '2015',
      coverUrl: 'https://covers.openlibrary.org/b/id/8225261-M.jpg'
    }
  ]);

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      {/* Header Section - Responsive */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
          <span className="mr-2 text-xl sm:text-2xl lg:text-3xl">❤️</span>
          Favorite Books
        </h1>
        <p className="text-sm sm:text-base text-gray-600">Books you've marked as favorites for quick access</p>
      </div>

      {favorites.length === 0 ? (
        /* Empty State - Responsive */
        <div className="text-center py-12 sm:py-16 lg:py-20 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl lg:text-5xl">💔</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">No favorites yet</h3>
          <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">
            Start adding books to your favorites list by clicking the heart icon
          </p>
          <button 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg text-sm sm:text-base"
            type="button"
          >
            Browse Books
          </button>
        </div>
      ) : (
        /* Books Grid - Responsive */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {/* Stats Section - Show when favorites exist - Responsive */}
      {favorites.length > 0 && (
        <div className="mt-8 sm:mt-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">Your Favorites</h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Personal collection of loved books</p>
                </div>
              </div>
              
              <div className="text-left sm:text-right">
                <p className="text-2xl sm:text-3xl font-bold text-gray-800">{favorites.length}</p>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Favorite Books</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;