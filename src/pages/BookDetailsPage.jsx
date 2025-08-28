import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        console.log('🔍 BookDetailPage: Looking for book ID:', id);
        
        // Try to get book data from storage
        let bookData = null;
        
        // Check sessionStorage first
        try {
          const sessionData = sessionStorage.getItem(`book_${id}`);
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
            const localData = localStorage.getItem(`book_${id}`);
            if (localData) {
              bookData = JSON.parse(localData);
              console.log('✅ Found book in localStorage:', bookData);
            }
          } catch (err) {
            console.warn('LocalStorage error:', err);
          }
        }
        
        if (bookData) {
          setBook(bookData);
          generateRelatedBooks(bookData);
        } else {
          console.log('❌ No book data found, using fallback');
          setError('Book not found');
        }
      } catch (error) {
        console.error('❌ Error fetching book details:', error);
        setError('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const generateRelatedBooks = (currentBook) => {
    const related = [
      {
        id: 'related_1',
        title: 'DEBT — The Next 5,000 Years',
        author: 'David Graeber',
        coverUrl: 'https://covers.openlibrary.org/b/id/8566785-M.jpg',
        category: currentBook.category
      },
      {
        id: 'related_2',
        title: 'Capital in the 21st Century',
        author: 'Thomas Piketty',
        coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
        category: currentBook.category
      },
      {
        id: 'related_3',
        title: 'The Wealth of Nations',
        author: 'Adam Smith',
        coverUrl: 'https://covers.openlibrary.org/b/id/295577-M.jpg',
        category: currentBook.category
      }
    ];
    setRelatedBooks(related);
  };

  const handleAddToCart = () => {
    setIsInCart(!isInCart);
    // Add to cart logic here
    console.log(isInCart ? 'Removed from cart' : 'Added to cart', book);
  };

  const handleRelatedBookClick = (relatedBook) => {
    // Store related book data and navigate
    const bookData = {
      ...relatedBook,
      pages: '320',
      language: 'English',
      rating: (Math.random() * 2 + 3).toFixed(1),
      description: `An insightful book about ${relatedBook.category}.`,
      publishYear: '2021'
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              type="button"
            >
              gestalten
            </button>
            <nav className="hidden sm:flex items-center space-x-8">
              <span className="text-xs sm:text-sm font-medium text-gray-800">Book Listing</span>
            </nav>
            <button 
              onClick={handleAddToCart}
              className={`text-xs sm:text-sm font-medium transition-colors ${
                isInCart ? 'text-red-600 hover:text-red-700' : 'text-gray-800 hover:text-gray-600'
              }`}
              type="button"
            >
              <span className="hidden sm:inline">{isInCart ? 'REMOVE FROM CART' : 'VIEW CART'}</span>
              <span className="sm:hidden">{isInCart ? 'REMOVE' : 'CART'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Fully Responsive */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 p-4 sm:p-8 lg:p-12">
            
            {/* Left Column - Book Cover - Responsive */}
            <div className="lg:col-span-1">
              <div className="relative">
                {/* Red background container matching the design - Responsive */}
                <div className="bg-red-500 p-4 sm:p-6 lg:p-8 rounded-lg">
                  <div className="bg-white p-2 sm:p-3 lg:p-4 rounded shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
                    <img 
                      src={book.coverUrl} 
                      alt={book.title}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/300/400?random=${book.id}`;
                      }}
                    />
                  </div>
                </div>
                
                {/* "Back Cover" label - Responsive */}
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                  <span className="text-xs font-medium text-white bg-black bg-opacity-20 px-2 py-1 rounded">
                    BACK THE PREVIEW
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Column - Book Details - Responsive */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Title and Author - Responsive */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-2">
                  {book.title}
                </h1>
                <p className="text-base sm:text-lg font-medium text-gray-600 mb-4 sm:mb-6">
                  by {book.author}
                </p>
                
                {/* Description - Responsive */}
                <div className="prose prose-sm sm:prose-base text-gray-700 leading-relaxed max-w-none">
                  <p className="mb-3 sm:mb-4 font-medium italic text-sm sm:text-base">
                    {book.category && `${book.category} enthusiasts, grand possibilities. Small libraries.`}
                  </p>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                    {book.description || `Grand Living shows how to make use of a limited space and turn a small apartment into a design marvel.`}
                  </p>
                  <p className="text-sm sm:text-base">
                    {`More contemporary David Graeber explores the phenomenon of conventional wisdom: he shows that believe there was money there was debt, for more than 5,000 years, since the beginnings of the first agrarian empires, humans have used elaborate credit systems to buy and sell goods—that is, long before the invention of coins or cash.`}
                  </p>
                </div>
              </div>

              {/* Book Information Grid - Responsive */}
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-1 sm:py-0">
                    <span className="font-medium text-gray-500">Edition</span>
                    <span className="text-gray-900">Gestalten</span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-0">
                    <span className="font-medium text-gray-500">Features</span>
                    <span className="text-gray-900">Full-color 256 pages</span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-0">
                    <span className="font-medium text-gray-500">Release Date</span>
                    <span className="text-gray-900">{book.publishYear || 'May 2017'}</span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-0">
                    <span className="font-medium text-gray-500">Language</span>
                    <span className="text-gray-900">{book.language || 'English'}</span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-0">
                    <span className="font-medium text-gray-500">Format</span>
                    <span className="text-gray-900">21 x 26 cm</span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-0">
                    <span className="font-medium text-gray-500">ISBN</span>
                    <span className="text-gray-900 font-mono text-xs">{book.isbn || '978-3-89955-616-9'}</span>
                  </div>
                </div>
              </div>

              {/* Reviewer Section - Responsive */}
              <div className="border-t border-gray-100 pt-4 sm:pt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm font-medium">CK</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1">Reviewed By</p>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">Christopher Booth</p>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      "I didn't really finish reading this book. I'm not qualified to review this Shit."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Related Books - Responsive */}
            <div className="lg:col-span-1">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">MORE LIKE THIS</h3>
                
                {relatedBooks.map((relatedBook, index) => (
                  <div 
                    key={relatedBook.id}
                    onClick={() => handleRelatedBookClick(relatedBook)}
                    className="cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-16 sm:w-16 sm:h-20 flex-shrink-0">
                        <img 
                          src={relatedBook.coverUrl} 
                          alt={relatedBook.title}
                          className="w-full h-full object-cover rounded shadow-sm group-hover:shadow-md transition-shadow"
                          onError={(e) => {
                            e.target.src = `https://picsum.photos/300/400?random=${relatedBook.id}`;
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 mb-1">
                          {relatedBook.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {relatedBook.author}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add to Cart Button - Responsive */}
                <div className="pt-4 sm:pt-6">
                  <button 
                    onClick={handleAddToCart}
                    className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ${
                      isInCart 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                    type="button"
                  >
                    {isInCart ? 'REMOVE FROM CART' : 'ADD TO CART'}
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

export default BookDetailPage;