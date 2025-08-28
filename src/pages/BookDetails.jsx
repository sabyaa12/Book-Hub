import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInCollection, setIsInCollection] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        console.log('🔍 BookDetails: Looking for book ID:', bookId);
        
        // Try to get book data from storage
        let bookData = null;
        
        // Check sessionStorage first
        try {
          const sessionData = sessionStorage.getItem(`book_${bookId}`);
          if (sessionData) {
            bookData = JSON.parse(sessionData);
            console.log('✅ Found book in sessionStorage:', bookData);
          }
        } catch (err) {
          console.warn('SessionStorage error:', err);
        }
        
        // Check localStorage as backup
        if (!bookData) {
          try {
            const localData = localStorage.getItem(`book_${bookId}`);
            if (localData) {
              bookData = JSON.parse(localData);
              console.log('✅ Found book in localStorage:', bookData);
            }
          } catch (err) {
            console.warn('LocalStorage error:', err);
          }
        }

        // Create fallback book if no data found
        if (!bookData) {
          console.log('📝 Creating fallback book for ID:', bookId);
          bookData = {
            id: bookId,
            title: 'DEBT — The First 5,000 Years',
            author: 'DAVID GRAEBER',
            publishYear: 'May 2017',
            category: 'Economics',
            pages: '534',
            language: 'English',
            rating: '4.5',
            description: 'Diminutive rooms, grand possibilities. Small homes. Grand Living shows how to make use of a limited space and turn a small apartment into a design marvel.',
            coverUrl: `https://covers.openlibrary.org/b/id/8566785-M.jpg`,
            isbn: '978-3-89955-616-9',
            format: '21 x 26 cm',
            features: 'Full-color 256 pages'
          };
          
          // Store the fallback book
          sessionStorage.setItem(`book_${bookId}`, JSON.stringify(bookData));
          localStorage.setItem(`book_${bookId}`, JSON.stringify(bookData));
        }
        
        setBook(bookData);
        generateRelatedBooks(bookData);
      } catch (error) {
        console.error('❌ Error fetching book details:', error);
        setError('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const generateRelatedBooks = (currentBook) => {
    const related = [
      {
        id: 'related_1',
        title: 'DEBT — The Next 5,000 Years',
        author: 'David Graeber',
        coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
        category: currentBook.category
      },
      {
        id: 'related_2',
        title: 'Capital in the 21st Century',
        author: 'Thomas Piketty',
        coverUrl: 'https://covers.openlibrary.org/b/id/295577-M.jpg',
        category: currentBook.category
      },
      {
        id: 'related_3',
        title: 'The Wealth of Nations',
        author: 'Adam Smith',
        coverUrl: 'https://covers.openlibrary.org/b/id/388761-M.jpg',
        category: currentBook.category
      }
    ];
    setRelatedBooks(related);
  };

  const handleDownload = () => {
    setIsDownloaded(!isDownloaded);
    console.log(isDownloaded ? 'Download cancelled' : 'Download started', book);
  };

  const handleAddToCollection = () => {
    setIsInCollection(!isInCollection);
    console.log(isInCollection ? 'Removed from collection' : 'Added to collection', book);
  };

  const handleRelatedBookClick = (relatedBook) => {
    const bookData = {
      ...relatedBook,
      pages: '320',
      language: 'English',
      rating: (Math.random() * 2 + 3).toFixed(1),
      description: `An insightful book about ${relatedBook.category}.`,
      publishYear: '2021',
      isbn: '978-3-89955-617-6',
      format: '21 x 26 cm',
      features: 'Full-color 280 pages'
    };
    
    sessionStorage.setItem(`book_${relatedBook.id}`, JSON.stringify(bookData));
    navigate(`/book/${relatedBook.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium text-sm sm:text-base">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Book not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-gray-800 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
            type="button"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              type="button"
            >
              BookFinder
            </button>
            <nav className="hidden sm:flex items-center space-x-8">
              <span className="text-xs sm:text-sm font-medium text-gray-800">Book Listing</span>
            </nav>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={handleDownload}
                className={`text-xs sm:text-sm font-medium transition-colors ${
                  isDownloaded ? 'text-green-600 hover:text-green-700' : 'text-gray-800 hover:text-gray-600'
                }`}
                type="button"
              >
                <span className="hidden sm:inline">{isDownloaded ? '✅ DOWNLOADED' : '📥 DOWNLOAD'}</span>
                <span className="sm:hidden">{isDownloaded ? '✅' : '📥'}</span>
              </button>
              <button 
                onClick={handleAddToCollection}
                className={`text-xs sm:text-sm font-medium transition-colors ${
                  isInCollection ? 'text-blue-600 hover:text-blue-700' : 'text-gray-800 hover:text-gray-600'
                }`}
                type="button"
              >
                <span className="hidden sm:inline">{isInCollection ? '📚 IN COLLECTION' : '➕ MY COLLECTION'}</span>
                <span className="sm:hidden">{isInCollection ? '📚' : '➕'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Fully Responsive */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 p-4 sm:p-8 lg:p-12">
            
            {/* Left Column - Enhanced Large 3D Book - Responsive */}
            <div className="lg:col-span-1">
              <div className="relative">
                {/* Responsive background container */}
                <div className="bg-red-400/60 p-4 sm:p-6 rounded-lg backdrop-blur-sm">
                  {/* Responsive Book Display Container */}
                  <div className="flex items-center justify-center">
                    {/* Enhanced Responsive 3D Book */}
                    <div className="relative" style={{ perspective: '800px' }}>
                      {/* Main Book - Responsive Size */}
                      <div className="relative group cursor-pointer">
                        {/* Enhanced Book Spine - Responsive */}
                        <div 
                          className="absolute left-0 top-0 bg-gray-800 shadow-xl"
                          style={{
                            width: '20px',
                            height: '240px',
                            transform: 'rotateY(-90deg) translateZ(10px)',
                            transformOrigin: 'left center',
                            background: 'linear-gradient(to bottom, #1f2937, #374151, #4b5563, #1f2937)'
                          }}
                        >
                          {/* Enhanced Spine Text - Responsive */}
                          <div className="h-full flex items-center justify-center p-1">
                            <div 
                              className="text-white text-xs font-bold transform -rotate-90 whitespace-nowrap"
                              style={{ fontSize: '8px', letterSpacing: '1px' }}
                            >
                              {book.title.slice(0, 20).toUpperCase()}
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Book Cover - Responsive */}
                        <div 
                          className="relative bg-white shadow-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-700 transform group-hover:scale-105 sm:group-hover:scale-110"
                          style={{
                            width: '180px',
                            height: '240px',
                            transform: 'translateZ(10px) rotateY(8deg)',
                            borderRadius: '0 6px 6px 0'
                          }}
                        >
                          {/* Responsive Book Cover Image */}
                          <img 
                            src={book.coverUrl} 
                            alt={book.title}
                            className="w-full h-full object-cover filter brightness-110 contrast-110"
                            style={{
                              imageRendering: 'crisp-edges'
                            }}
                            onError={(e) => {
                              // Enhanced fallback cover
                              const canvas = document.createElement('canvas');
                              canvas.width = 180;
                              canvas.height = 240;
                              const ctx = canvas.getContext('2d');
                              
                              // Enhanced gradient background
                              const gradient = ctx.createLinearGradient(0, 0, 0, 240);
                              gradient.addColorStop(0, '#1f2937');
                              gradient.addColorStop(0.5, '#374151');
                              gradient.addColorStop(1, '#1f2937');
                              ctx.fillStyle = gradient;
                              ctx.fillRect(0, 0, 180, 240);
                              
                              // Enhanced title
                              ctx.fillStyle = 'white';
                              ctx.font = 'bold 14px Arial';
                              ctx.textAlign = 'center';
                              const titleWords = book.title.split(' ');
                              titleWords.slice(0, 4).forEach((word, index) => {
                                ctx.fillText(word, 90, 100 + (index * 20));
                              });
                              
                              // Enhanced author
                              ctx.font = '12px Arial';
                              ctx.fillText(book.author, 90, 180);
                              
                              // Enhanced decoration
                              ctx.strokeStyle = 'white';
                              ctx.lineWidth = 2;
                              ctx.strokeRect(15, 15, 150, 210);
                              
                              e.target.src = canvas.toDataURL();
                            }}
                          />
                          
                          {/* Enhanced overlay effects */}
                          <div 
                            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                          ></div>

                          {/* Enhanced Rating Badge - Responsive */}
                          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur-md rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-2 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span className="text-yellow-500 text-xs sm:text-sm">⭐</span>
                              <span className="text-xs sm:text-sm font-bold text-gray-800">{book.rating}</span>
                            </div>
                          </div>

                          {/* Enhanced Page indicator - Responsive */}
                          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-black/70 backdrop-blur-md rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                            <span className="text-white text-xs sm:text-sm font-semibold">{book.pages} pages</span>
                          </div>
                        </div>

                        {/* Enhanced Book Pages Stack Effect - Responsive */}
                        <div 
                          className="absolute top-1 left-1 bg-gray-100 shadow-lg"
                          style={{
                            width: '178px',
                            height: '238px',
                            transform: 'translateZ(8px) rotateY(8deg)',
                            borderRadius: '0 6px 6px 0',
                            zIndex: -1
                          }}
                        ></div>
                        <div 
                          className="absolute top-2 left-2 bg-gray-200 shadow-md"
                          style={{
                            width: '176px',
                            height: '236px',
                            transform: 'translateZ(6px) rotateY(8deg)',
                            borderRadius: '0 6px 6px 0',
                            zIndex: -2
                          }}
                        ></div>
                        <div 
                          className="absolute top-3 left-3 bg-gray-300 shadow-sm"
                          style={{
                            width: '174px',
                            height: '234px',
                            transform: 'translateZ(4px) rotateY(8deg)',
                            borderRadius: '0 6px 6px 0',
                            zIndex: -3
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Preview Label - Responsive */}
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-xs sm:text-sm font-medium text-white bg-black/40 backdrop-blur-md px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg">
                      📖 PREVIEW AVAILABLE
                    </span>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </div>

                {/* Enhanced Status Badge - Responsive */}
                <div className="absolute top-3 sm:top-6 right-3 sm:right-6">
                  <div className="bg-white/95 backdrop-blur-md rounded-lg sm:rounded-xl px-2 sm:px-4 py-1 sm:py-2 shadow-xl">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <span className="text-green-500 text-xs sm:text-sm">●</span>
                      <span className="text-xs font-bold text-gray-800">AVAILABLE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Book Details - Responsive */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* Title and Author - Responsive */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">
                  {book.title}
                </h1>
                <p className="text-lg sm:text-xl font-medium text-gray-600 mb-4 sm:mb-8">
                  by {book.author}
                </p>
                
                {/* Status Display - Responsive */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-8">
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800">
                    📚 Available for Reading
                  </span>
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
                    📱 Digital Format
                  </span>
                </div>
                
                {/* Enhanced Description - Responsive */}
                <div className="prose prose-sm sm:prose-lg text-gray-700 leading-relaxed space-y-3 sm:space-y-6 max-w-none">
                  <p className="font-medium italic text-indigo-600 text-base sm:text-lg">
                    Diminutive rooms, grand possibilities. Small homes.
                  </p>
                  <p className="text-sm sm:text-base">
                    Grand Living shows how to make use of a limited space and turn a small apartment into a design marvel.
                  </p>
                  <p className="text-sm sm:text-base">
                    More contemporary David Graeber explores the phenomenon of conventional wisdom: he shows that believe there was money there was debt, for more than 5,000 years, since the beginnings of the first agrarian empires, humans have used elaborate credit systems to buy and sell goods—that is, long before the invention of coins or cash.
                  </p>
                </div>
              </div>

              {/* Enhanced Book Information Grid - Responsive */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 shadow-inner">
                <h4 className="font-bold text-gray-800 mb-4 sm:mb-6 text-base sm:text-lg">Book Details</h4>
                <div className="grid grid-cols-1 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-600">Edition</span>
                    <span className="text-gray-900 font-bold text-right">BookFinder Edition</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-600">Features</span>
                    <span className="text-gray-900 text-right">{book.features || 'Full-color 256 pages'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-600">Release Date</span>
                    <span className="text-gray-900 text-right">{book.publishYear}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-600">Language</span>
                    <span className="text-gray-900 text-right">{book.language}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-600">Format</span>
                    <span className="text-gray-900 text-right">{book.format || '21 x 26 cm'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-600">ISBN</span>
                    <span className="text-gray-900 font-mono text-xs bg-gray-200 px-2 py-1 rounded text-right">{book.isbn}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Reviewer Section - Responsive */}
              <div className="border-t-2 border-gray-200 pt-4 sm:pt-8">
                <h4 className="font-bold text-gray-800 mb-4 sm:mb-6 text-base sm:text-lg">Featured Review</h4>
                <div className="flex items-start space-x-3 sm:space-x-5">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl flex-shrink-0">
                    <span className="text-white text-sm sm:text-lg font-bold">CK</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3">
                      <h5 className="text-sm sm:text-base font-bold text-gray-900">Christopher Booth</h5>
                      <div className="flex text-yellow-400 text-sm sm:text-lg">
                        ⭐⭐⭐⭐⭐
                      </div>
                      <span className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded-full">Verified Reader</span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed bg-gradient-to-r from-gray-50 to-blue-50 p-3 sm:p-5 rounded-xl border-l-4 border-blue-500">
                      "I didn't really finish reading this book. I'm not qualified to review this Shit."
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <span>👍</span>
                        <span>Helpful (12)</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>📅</span>
                        <span>2 weeks ago</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Related Books & Actions - Responsive */}
            <div className="lg:col-span-1">
              <div className="space-y-4 sm:space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">MORE LIKE THIS</h3>
                  <span className="text-xs sm:text-sm bg-purple-100 text-purple-700 px-2 sm:px-3 py-1 rounded-full font-semibold">
                    {relatedBooks.length} books
                  </span>
                </div>
                
                {/* Enhanced Related Books - Responsive */}
                {relatedBooks.map((relatedBook, index) => (
                  <div 
                    key={relatedBook.id}
                    onClick={() => handleRelatedBookClick(relatedBook)}
                    className="cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-5 p-3 sm:p-5 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50 transition-all duration-400 border border-transparent hover:border-purple-200 hover:shadow-lg">
                      <div className="w-12 h-16 sm:w-16 sm:h-24 flex-shrink-0 relative">
                        {/* Enhanced mini 3D book - Responsive */}
                        <div 
                          className="relative transform group-hover:scale-110 sm:group-hover:scale-125 transition-transform duration-400"
                          style={{ perspective: '200px' }}
                        >
                          {/* Enhanced mini spine */}
                          <div 
                            className="absolute left-0 top-0 h-full w-2 sm:w-3 bg-gradient-to-b from-gray-600 to-gray-800 shadow-lg"
                            style={{
                              transform: 'rotateY(-90deg) translateZ(2px)',
                              transformOrigin: 'left center'
                            }}
                          ></div>
                          
                          {/* Enhanced mini cover */}
                          <img 
                            src={relatedBook.coverUrl} 
                            alt={relatedBook.title}
                            className="w-full h-full object-cover rounded-sm shadow-xl group-hover:shadow-2xl transition-shadow duration-400 filter brightness-110"
                            style={{ 
                              transform: 'rotateY(-12deg) translateZ(2px)',
                              transformStyle: 'preserve-3d'
                            }}
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/120x180/1f2937/ffffff?text=${encodeURIComponent(relatedBook.title.slice(0, 5))}`;
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2 mb-1 sm:mb-2">
                          {relatedBook.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                          {relatedBook.author}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <span className="text-xs sm:text-sm bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full font-medium">
                            {relatedBook.category}
                          </span>
                          <span className="text-xs sm:text-sm text-green-600 font-semibold">
                            📚 Available
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-400 group-hover:text-purple-500 transition-colors">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Enhanced Action Buttons - Responsive */}
                <div className="pt-4 sm:pt-8 space-y-3 sm:space-y-4">
                  <button 
                    onClick={handleDownload}
                    className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl ${
                      isDownloaded 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                    }`}
                    type="button"
                  >
                    {isDownloaded ? '✅ DOWNLOADED' : '📥 DOWNLOAD BOOK'}
                  </button>
                  
                  <button 
                    onClick={handleAddToCollection}
                    className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl ${
                      isInCollection 
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700' 
                        : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900'
                    }`}
                    type="button"
                  >
                    {isInCollection ? '📚 IN MY COLLECTION' : '➕ ADD TO COLLECTION'}
                  </button>
                  
                  {/* Enhanced Quick Action Grid - Responsive */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button 
                      className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg"
                      type="button"
                    >
                      📖 Preview
                    </button>
                    <button 
                      className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg"
                      type="button"
                    >
                      ❤️ Wishlist
                    </button>
                  </div>
                  
                  <button 
                    className="w-full py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base font-semibold text-indigo-600 bg-indigo-50 border-2 border-indigo-200 rounded-xl hover:bg-indigo-100 transition-colors shadow-md hover:shadow-lg"
                    type="button"
                  >
                    📚 More by {book.author}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;