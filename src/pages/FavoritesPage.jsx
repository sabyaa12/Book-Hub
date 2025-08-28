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
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">❤️ Favorite Books</h1>
        <p className="text-gray-600">Books you've marked as favorites for quick access</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h3>
          <p className="text-gray-600">Start adding books to your favorites list by clicking the heart icon</p>
          <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Browse Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;