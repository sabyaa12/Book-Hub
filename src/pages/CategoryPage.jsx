import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { searchBooksBySubject } from '../api/openLibrary';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get category data from navigation state or create default
  const category = location.state?.category || {
    name: categoryName?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    icon: '📚',
    color: 'from-blue-500 to-indigo-600',
    count: 0
  };

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('🔍 Fetching books for category:', category.name);
        
        // Search for books in this category
        const searchQuery = category.name.toLowerCase();
        const response = await searchBooksBySubject(searchQuery, 20);
        
        if (response.books && response.books.length > 0) {
          console.log('✅ Found books:', response.books.length);
          setBooks(response.books);
        } else {
          // If no books found, try alternative search terms
          const alternativeQueries = getAlternativeSearchTerms(category.name);
          let allBooks = [];
          
          for (const query of alternativeQueries) {
            try {
              const altResponse = await searchBooksBySubject(query, 5);
              if (altResponse.books) {
                allBooks.push(...altResponse.books);
              }
              // Add delay to be respectful to API
              await new Promise(resolve => setTimeout(resolve, 300));
            } catch (err) {
              console.warn('Alternative search failed:', err);
            }
          }
          
          setBooks(allBooks.slice(0, 20)); // Limit to 20 books
        }
      } catch (err) {
        console.error('❌ Error fetching category books:', err);
        setError('Failed to load books for this category');
        
        // Set fallback books based on category
        setBooks(getFallbackBooksForCategory(category.name));
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBooks();
  }, [category.name]);

  // Get alternative search terms for better results
  const getAlternativeSearchTerms = (categoryName) => {
    const alternatives = {
      'Computer Science': ['programming', 'algorithms', 'software engineering', 'data structures'],
      'Mathematics': ['math', 'calculus', 'algebra', 'statistics'],
      'Physics': ['quantum', 'mechanics', 'thermodynamics', 'relativity'],
      'Chemistry': ['organic chemistry', 'biochemistry', 'molecular'],
      'Biology': ['life sciences', 'genetics', 'evolution', 'cell biology'],
      'Psychology': ['cognitive science', 'behavioral psychology', 'neuroscience']
    };
    
    return alternatives[categoryName] || [categoryName.toLowerCase()];
  };

  // Fallback books for each category
  const getFallbackBooksForCategory = (categoryName) => {
    const fallbackBooks = {
      'Computer Science': [
        {
          id: 'cs_1',
          title: 'Introduction to Algorithms',
          author: 'Thomas H. Cormen',
          coverUrl: 'https://covers.openlibrary.org/b/id/8566785-M.jpg',
          publishYear: '2009',
          category: 'Computer Science',
          rating: '4.8',
          description: 'Comprehensive introduction to algorithms and data structures.'
        },
        {
          id: 'cs_2',
          title: 'Clean Code',
          author: 'Robert C. Martin',
          coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
          publishYear: '2008',
          category: 'Computer Science',
          rating: '4.6',
          description: 'A handbook of agile software craftsmanship.'
        }
      ],
      'Mathematics': [
        {
          id: 'math_1',
          title: 'Calculus: Early Transcendentals',
          author: 'James Stewart',
          coverUrl: 'https://picsum.photos/300/400?random=math1',
          publishYear: '2015',
          category: 'Mathematics',
          rating: '4.4',
          description: 'Comprehensive calculus textbook.'
        }
      ]
      // Add more fallback books for other categories as needed
    };
    
    return fallbackBooks[categoryName] || [];
  };

  const handleBookClick = (book) => {
    console.log('📖 Category page: Book clicked:', book);
    
    const bookId = book.id.toString();
    const bookData = {
      id: bookId,
      title: book.title || 'Unknown Title',
      author: book.author || 'Unknown Author',
      coverUrl: book.coverUrl || `https://picsum.photos/300/400?random=${bookId}`,
      publishYear: book.publishYear?.toString() || '2023',
      category: book.category || category.name,
      pages: book.pages?.toString() || '250',
      language: book.language || 'English',
      rating: book.rating || (Math.random() * 2 + 3).toFixed(1),
      description: book.description || `A great book about ${category.name.toLowerCase()}.`,
      isbn: book.isbn || '',
      editionCount: book.editionCount || 1,
      hasFulltext: book.hasFulltext || false,
      ebookAccess: book.ebookAccess || 'no_ebook'
    };

    // Store book data
    try {
      sessionStorage.setItem(`book_${bookId}`, JSON.stringify(bookData));
      localStorage.setItem(`book_${bookId}`, JSON.stringify(bookData));
    } catch (error) {
      console.error('Failed to store book data:', error);
    }
    
    navigate(`/book/${bookId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium text-sm sm:text-base">Loading {category.name} books...</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">Searching Open Library...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{error}</h2>
            <button 
              onClick={() => navigate('/')}
              className="bg-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
              type="button"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb - Responsive */}
          <nav className="mb-6 sm:mb-8">
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <button 
                onClick={() => navigate('/')}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
                type="button"
              >
                Home
              </button>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-600">Categories</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-800 font-medium truncate">{category.name}</span>
            </div>
          </nav>

          {/* Category Header - Responsive */}
          <div className="text-center mb-12 sm:mb-16">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r ${category.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl mx-auto mb-4 sm:mb-6 shadow-lg`}>
              {category.icon}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-4">
              {category.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Explore our collection of {books.length} books in {category.name}
            </p>
          </div>
        </div>
      </section>

      {/* Books Grid - Responsive */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {books.length > 0 ? (
            <>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {books.length} Books Found
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Live from Open Library
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
            </>
          ) : (
            <div className="text-center py-12 sm:py-16 px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                No books found in {category.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
                Try browsing other categories or search for specific topics
              </p>
              <button 
                onClick={() => navigate('/')}
                className="bg-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
                type="button"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;