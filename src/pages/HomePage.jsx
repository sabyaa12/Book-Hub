import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { fetchBooksFromCategories, searchBooks } from '../api/openLibrary';

const HomePage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [categories] = useState([
    { name: 'Computer Science', count: 1240, icon: '💻', color: 'from-blue-500 to-indigo-600' },
    { name: 'Mathematics', count: 856, icon: '📐', color: 'from-purple-500 to-pink-600' },
    { name: 'Physics', count: 642, icon: '⚛️', color: 'from-green-500 to-teal-600' },
    { name: 'Chemistry', count: 489, icon: '🧪', color: 'from-orange-500 to-red-600' },
    { name: 'Biology', count: 578, icon: '🧬', color: 'from-emerald-500 to-cyan-600' },
    { name: 'Psychology', count: 367, icon: '🧠', color: 'from-indigo-500 to-purple-600' }
  ]);

  // ✅ Fallback sample books (in case API fails)
  const getFallbackBooks = () => {
    return [
      {
        id: 'fallback_1',
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        coverUrl: 'https://covers.openlibrary.org/b/id/8566785-M.jpg',
        publishYear: '2009',
        pages: '1312',
        language: 'English',
        isbn: '9780262033848',
        category: 'Computer Science',
        rating: '4.8',
        description: 'This book provides a comprehensive introduction to the modern study of computer algorithms. It presents many algorithms and covers them in considerable depth, yet makes their design and analysis accessible to all levels of readers.'
      },
      {
        id: 'fallback_2',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
        publishYear: '2008',
        pages: '464',
        language: 'English',
        isbn: '9780132350884',
        category: 'Programming',
        rating: '4.6',
        description: 'A handbook of agile software craftsmanship. This book presents a revolutionary paradigm that will help you write better code whether you are a novice or an expert programmer.'
      },
      {
        id: 'fallback_3',
        title: 'Design Patterns',
        author: 'Gang of Four',
        coverUrl: 'https://covers.openlibrary.org/b/id/295577-M.jpg',
        publishYear: '1994',
        pages: '395',
        language: 'English',
        isbn: '9780201633610',
        category: 'Software Engineering',
        rating: '4.5',
        description: 'Design Patterns is a modern classic in the literature of object-oriented development, offering timeless and elegant solutions to common problems in software design.'
      },
      {
        id: 'fallback_4',
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        coverUrl: 'https://covers.openlibrary.org/b/id/388761-M.jpg',
        publishYear: '1999',
        pages: '352',
        language: 'English',
        isbn: '9780201616224',
        category: 'Programming',
        rating: '4.7',
        description: 'Filled with practical advice and numerous examples, this book will help you become a better programmer and more productive in your work.'
      }
    ];
  };

  useEffect(() => {
    const fetchBooksData = async () => {
      setLoading(true);
      console.log('🚀 Starting to fetch books...');
      
      try {
        // Fetch from Open Library API
        const apiBooks = await fetchBooksFromCategories();
        
        if (apiBooks.length > 0) {
          console.log('✅ Successfully fetched from API:', apiBooks.length, 'books');
          
          // Split books between featured and recommended
          const shuffledBooks = apiBooks.sort(() => Math.random() - 0.5);
          const featuredBooks = shuffledBooks.slice(0, 8); // First 8 for featured
          const recommendedBooksData = shuffledBooks.slice(8, 16); // Next 8 for recommended
          
          // If we don't have enough, fill with fallback books
          const fallbackBooks = getFallbackBooks();
          
          const finalFeatured = featuredBooks.length >= 4 
            ? featuredBooks.slice(0, 6) 
            : [...featuredBooks, ...fallbackBooks].slice(0, 6);
            
          const finalRecommended = recommendedBooksData.length >= 4 
            ? recommendedBooksData.slice(0, 4) 
            : [...recommendedBooksData, ...fallbackBooks].slice(0, 4);
          
          setBooks(finalFeatured);
          setRecommendedBooks(finalRecommended);
        } else {
          console.log('⚠️ No API books found, using fallback data');
          const fallbackBooks = getFallbackBooks();
          setBooks(fallbackBooks);
          setRecommendedBooks(fallbackBooks.slice(0, 4));
        }
      } catch (error) {
        console.error('❌ Error in fetchBooks:', error);
        const fallbackBooks = getFallbackBooks();
        setBooks(fallbackBooks);
        setRecommendedBooks(fallbackBooks.slice(0, 4));
      } finally {
        setLoading(false);
        console.log('✅ Book fetching completed');
      }
    };

    fetchBooksData();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      handleSearch();
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    setIsSearching(true);
    
    try {
      // First search in local books
      const allBooks = [...books, ...recommendedBooks];
      const localResults = allBooks.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Also search Open Library API for real-time results
      try {
        const apiResponse = await searchBooks(searchQuery, 8);
        const apiResults = apiResponse.books || [];
        
        // Combine local and API results, remove duplicates
        const combinedResults = [...localResults, ...apiResults];
        const uniqueResults = combinedResults.filter((book, index, self) => 
          index === self.findIndex(b => b.title.toLowerCase() === book.title.toLowerCase())
        );
        
        setSearchResults(uniqueResults.slice(0, 12)); // Limit to 12 results
      } catch (apiError) {
        console.error('Search API error:', apiError);
        setSearchResults(localResults);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // ✅ FIXED: handleBookClick now accepts book object and stores complete data
  const handleBookClick = (book) => {
    console.log('🏠 HOME PAGE: Book clicked:', book);
    
    // Generate consistent book ID
    const bookId = book.id.toString();

    // Create complete book data with all necessary fields
    const bookData = {
      id: bookId,
      title: book.title || 'Featured Book',
      author: book.author || 'Unknown Author',
      coverUrl: book.coverUrl || `https://picsum.photos/300/400?random=${bookId}`,
      publishYear: book.publishYear?.toString() || '2023',
      category: book.category || 'Featured',
      pages: book.pages?.toString() || '250',
      language: book.language || 'English',
      rating: book.rating || (Math.random() * 2 + 3).toFixed(1),
      description: book.description || `A featured book from our collection. This resource provides valuable insights and knowledge for readers interested in ${book.category || 'various topics'}.`,
      isbn: book.isbn || '',
      editionCount: book.editionCount || 1,
      hasFulltext: book.hasFulltext || false,
      ebookAccess: book.ebookAccess || 'no_ebook'
    };

    console.log('💾 HOME PAGE: Storing book data:', bookData);
    
    // Store in BOTH storages for reliability
    try {
      sessionStorage.setItem(`book_${bookId}`, JSON.stringify(bookData));
      localStorage.setItem(`book_${bookId}`, JSON.stringify(bookData));
      console.log('✅ HOME PAGE: Successfully stored book data');
    } catch (error) {
      console.error('❌ HOME PAGE: Failed to store book data:', error);
    }
    
    // Navigate to book details
    console.log('🔗 HOME PAGE: Navigating to:', `/book/${bookId}`);
    navigate(`/book/${bookId}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.name.toLowerCase().replace(' ', '-')}`, {
      state: { category }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium text-sm sm:text-base">Loading amazing books from Open Library...</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">Fetching the latest content for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Discover Your Next
              </span>
              <br />
              <span className="text-gray-800">Great Read</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed px-4">
              Explore thousands of books from Open Library, research papers, and educational resources. 
              Build your personal library and advance your knowledge.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <button 
              onClick={() => {
                const searchElement = document.getElementById('search-section');
                if (searchElement) {
                  searchElement.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    const searchInput = document.getElementById('search-input');
                    if (searchInput) {
                      searchInput.focus();
                    }
                  }, 500);
                }
              }}
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
              type="button"
            >
              <span className="flex items-center justify-center">
                Start Exploring
                <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button 
              onClick={() => navigate('/collection')}
              className="text-gray-700 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-gray-300 hover:border-indigo-500 hover:text-indigo-600 transition-all duration-300 bg-white/80 backdrop-blur-sm w-full sm:w-auto"
              type="button"
            >
              View My Collection
            </button>
          </div>
        </div>
      </section>

      {/* Search Section - Responsive */}
      <section id="search-section" className="py-12 sm:py-16 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Find Your Perfect Book</h2>
            <p className="text-gray-600 font-medium text-sm sm:text-base">Search through Open Library's vast collection</p>
          </div>
          
          <div className="relative mb-6 sm:mb-8">
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for books, authors, subjects..."
              className="w-full py-3 sm:py-4 px-4 sm:px-6 pr-12 sm:pr-14 text-base sm:text-lg border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 bg-white shadow-lg"
            />
            <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
              {isSearching ? (
                <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-indigo-600"></div>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
          </div>

          {/* Search Results - Responsive */}
          {searchQuery.length > 2 && (
            <div className="mb-6 sm:mb-8">
              {searchResults.length > 0 ? (
                <>
                  <p className="text-gray-600 font-medium mb-4 sm:mb-6 text-sm sm:text-base">
                    Found {searchResults.length} results for "{searchQuery}"
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {searchResults.map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        onBookClick={handleBookClick}
                        showHoverDetails={true}
                        size="featured"
                      />
                    ))}
                  </div>
                </>
              ) : !isSearching && (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">No results found</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Try different keywords or check your spelling</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Recommended Books Section - Responsive */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-12 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Recommended for You</h2>
              <p className="text-gray-600 font-medium text-sm sm:text-base">Fresh picks from Open Library's collection</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Live from Open Library
              </span>
              <button 
                onClick={() => navigate('/categories')}
                className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center transition-colors text-sm sm:text-base"
                type="button"
              >
                View All
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {recommendedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onBookClick={handleBookClick}
                showHoverDetails={true}
                size="featured"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Responsive */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Browse by Category</h2>
            <p className="text-gray-600 font-medium text-sm sm:text-base">Find books in your field of interest</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-200 hover:border-indigo-300"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${category.color} rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 font-medium text-sm sm:text-base">{category.count} books available</p>
                <div className="mt-3 sm:mt-4 flex items-center text-indigo-600 group-hover:text-indigo-700 font-semibold text-sm sm:text-base">
                  <span>Explore</span>
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Books Section - Responsive */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-12 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Featured Books</h2>
              <p className="text-gray-600 font-medium text-sm sm:text-base">Curated selections from Open Library</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                Updated Daily
              </span>
              <button 
                onClick={() => navigate('/categories')}
                className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center transition-colors text-sm sm:text-base"
                type="button"
              >
                View All
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onBookClick={handleBookClick}
                showHoverDetails={true}
                size="featured"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section - Responsive */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { label: 'Total Books', value: '10M+', icon: '📚', color: 'from-blue-500 to-indigo-600' },
              { label: 'Active Readers', value: '1M+', icon: '👥', color: 'from-green-500 to-teal-600' },
              { label: 'Open Library', value: 'Live API', icon: '🌐', color: 'from-purple-500 to-pink-600' },
              { label: 'Categories', value: '1000+', icon: '🏷️', color: 'from-orange-500 to-red-600' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-2xl lg:text-3xl mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {stat.icon}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium text-xs sm:text-sm lg:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;