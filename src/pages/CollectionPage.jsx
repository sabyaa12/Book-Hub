import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CollectionPage = () => {
  const navigate = useNavigate();
  const [collection, setCollection] = useState([
    {
      id: 'col-1',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      publishYear: '2009',
      coverUrl: 'https://covers.openlibrary.org/b/id/8566785-L.jpg',
      dateAdded: '2024-01-15',
      progress: 45,
      pages: 1312
    },
    {
      id: 'col-2',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      publishYear: '2008',
      coverUrl: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
      dateAdded: '2024-01-10',
      progress: 78,
      pages: 464
    },
    {
      id: 'col-3',
      title: 'React Handbook',
      author: 'Flavio Copes',
      publishYear: '2020',
      coverUrl: 'https://covers.openlibrary.org/b/id/8225261-L.jpg',
      dateAdded: '2024-01-08',
      progress: 23,
      pages: 280
    },
    {
      id: 'col-4',
      title: 'Design Patterns',
      author: 'Gang of Four',
      publishYear: '1994',
      coverUrl: 'https://covers.openlibrary.org/b/id/295577-L.jpg',
      dateAdded: '2024-01-05',
      progress: 90,
      pages: 395
    }
  ]);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleRemoveFromCollection = (bookId) => {
    setCollection(collection.filter(book => book.id !== bookId));
  };

  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (bookId) => {
    setImageErrors(prev => ({
      ...prev,
      [bookId]: true
    }));
  };

  const getProgressColor = (progress) => {
    if (progress < 25) return 'from-red-500 to-red-600';
    if (progress < 50) return 'from-yellow-500 to-orange-500';
    if (progress < 75) return 'from-blue-500 to-indigo-500';
    return 'from-green-500 to-emerald-500';
  };

  const getProgressText = (progress) => {
    if (progress === 0) return 'Not Started';
    if (progress === 100) return 'Completed';
    return 'In Progress';
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                My Collection
              </h1>
              <p className="text-gray-600 font-medium">Your saved books and reading progress</p>
            </div>
          </div>
          
          {collection.length > 0 && (
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-800">{collection.length}</p>
              <p className="text-sm text-gray-600 font-medium">Total Books</p>
            </div>
          )}
        </div>

        {/* Quick Stats - Average Progress Removed */}
        {collection.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-2xl font-bold text-gray-900">{collection.length}</p>
                  <p className="text-xs font-semibold text-gray-600">Total Books</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-2xl font-bold text-gray-900">
                    {collection.filter(book => book.progress === 100).length}
                  </p>
                  <p className="text-xs font-semibold text-gray-600">Completed</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-lg text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-2xl font-bold text-gray-900">
                    {collection.filter(book => book.progress > 0 && book.progress < 100).length}
                  </p>
                  <p className="text-xs font-semibold text-gray-600">In Progress</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {collection.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">No books in your collection</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">Start building your personal library by adding books you're interested in</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            Browse Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collection.map((book) => (
            <div key={book.id} className="group">
              {/* Enhanced Professional Book Card with Better Image Quality */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-indigo-300 overflow-hidden">
                {/* Book Cover with Better Quality */}
                <div className="relative h-72 overflow-hidden bg-gray-50">
                  {!imageErrors[book.id] ? (
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(book.id)}
                      onClick={() => handleBookClick(book.id)}
                      style={{
                        imageRendering: 'crisp-edges',
                        objectPosition: 'center top'
                      }}
                    />
                  ) : (
                    <div 
                      className="w-full h-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center cursor-pointer"
                      onClick={() => handleBookClick(book.id)}
                    >
                      <div className="text-center p-4">
                        <div className="w-16 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg shadow-lg mx-auto mb-3 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-gray-700 leading-tight">
                          {book.title.length > 30 ? book.title.substring(0, 30) + '...' : book.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Book Cover</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromCollection(book.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 shadow-lg"
                    title="Remove from collection"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Progress Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getProgressColor(book.progress)} shadow-lg`}>
                      {book.progress}%
                    </span>
                  </div>
                </div>

                {/* Book Details with Progress */}
                <div className="p-5">
                  {/* Title and Author */}
                  <div className="mb-4">
                    <h3 
                      className="font-bold text-gray-900 text-base leading-tight mb-2 cursor-pointer hover:text-indigo-600 transition-colors line-clamp-2"
                      onClick={() => handleBookClick(book.id)}
                      title={book.title}
                    >
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-medium line-clamp-1" title={book.author}>
                      by {book.author}
                    </p>
                  </div>

                  {/* Progress Section */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-700">
                        {getProgressText(book.progress)}
                      </span>
                      <span className="text-xs font-bold text-indigo-600">
                        {book.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 shadow-inner">
                      <div 
                        className={`bg-gradient-to-r ${getProgressColor(book.progress)} h-2.5 rounded-full transition-all duration-500 shadow-sm`}
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <span className="bg-gray-100 px-2 py-1 rounded-md font-medium">
                        {book.publishYear}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        PDF
                      </span>
                    </div>
                    <span className="text-gray-400 font-medium text-xs">
                      Added {book.dateAdded}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;