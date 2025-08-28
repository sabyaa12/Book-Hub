const API_BASE = 'https://openlibrary.org';

export const searchBooks = async (query, limit = 20) => {
  try {
    const response = await fetch(
      `${API_BASE}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&fields=key,title,author_name,first_publish_year,language,edition_count,ebook_access,subject,publisher,cover_i`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform API response to match your app's format
    return {
      numFound: data.numFound || 0,
      books: data.docs?.map(transformBookData) || []
    };
  } catch (error) {
    console.error('Search API error:', error);
    return { numFound: 0, books: [] };
  }
};

export const getBookDetails = async (bookId) => {
  try {
    // Try to get book details using the work key
    const workKey = bookId.startsWith('/works/') ? bookId : `/works/${bookId}`;
    
    const response = await fetch(`${API_BASE}${workKey}.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return transformBookData(data);
  } catch (error) {
    console.error('Book details API error:', error);
    return null;
  }
};

// Transform Open Library data to your app format
const transformBookData = (apiBook) => {
  // Extract work ID from key
  const workId = apiBook.key?.split('/').pop() || 
                 apiBook.key?.replace('/works/', '') || 
                 Math.random().toString(36).substr(2, 9);

  return {
    id: workId,
    title: apiBook.title || 'Unknown Title',
    author: Array.isArray(apiBook.author_name) 
      ? apiBook.author_name.join(', ') 
      : apiBook.author_name || 'Unknown Author',
    publishYear: apiBook.first_publish_year?.toString() || 'Unknown',
    category: Array.isArray(apiBook.subject) 
      ? apiBook.subject[0] 
      : apiBook.subject || 'General',
    pages: apiBook.number_of_pages?.toString() || (Math.floor(Math.random() * 400 + 200)).toString(),
    language: Array.isArray(apiBook.language) 
      ? apiBook.language.includes('eng') ? 'English' : apiBook.language[0] 
      : 'English',
    rating: (Math.random() * 2 + 3).toFixed(1), // Generate random rating 3-5
    description: apiBook.description?.value || 
                 apiBook.description || 
                 `A comprehensive book about ${apiBook.title}. This resource provides valuable insights and knowledge for readers interested in the subject matter.`,
    coverUrl: apiBook.cover_i 
      ? `https://covers.openlibrary.org/b/id/${apiBook.cover_i}-M.jpg`
      : `https://picsum.photos/300/400?random=${workId}`,
    isbn: apiBook.isbn?.[0] || `978-${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
    editionCount: apiBook.edition_count || 1,
    hasFulltext: apiBook.has_fulltext || false,
    ebookAccess: apiBook.ebook_access || 'no_ebook'
  };
};

// Get book cover URL
export const getBookCover = (coverId, size = 'M') => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

// Search by specific criteria
export const searchBooksByAuthor = async (author, limit = 10) => {
  return searchBooks(`author:"${author}"`, limit);
};

export const searchBooksBySubject = async (subject, limit = 10) => {
  return searchBooks(`subject:"${subject}"`, limit);
};

// Fetch books from multiple categories
export const fetchBooksFromCategories = async () => {
  try {
    console.log('📚 Fetching books from Open Library API...');
    
    // Fetch different book categories for variety
    const queries = [
      'computer science',
      'programming',
      'mathematics',
      'artificial intelligence',
      'data science',
      'web development'
    ];

    const allBooks = [];
    
    for (const query of queries) {
      try {
        const response = await fetch(
          `${API_BASE}/search.json?q=${encodeURIComponent(query)}&limit=3&fields=key,title,author_name,first_publish_year,language,edition_count,ebook_access,subject,cover_i`
        );
        
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ API Response for "${query}":`, data);
          
          if (data.docs && data.docs.length > 0) {
            const transformedBooks = data.docs.map((book, index) => transformCategoryBookData(book, query, index));
            allBooks.push(...transformedBooks);
          }
        }
        
        // Add delay to be respectful to API
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`❌ Error fetching ${query}:`, error);
      }
    }

    return allBooks;
  } catch (error) {
    console.error('❌ Overall API error:', error);
    return [];
  }
};

// Transform category-specific book data
const transformCategoryBookData = (apiBook, category, index) => {
  const workId = apiBook.key?.replace('/works/', '') || `api_${Date.now()}_${index}`;
  
  return {
    id: workId,
    title: apiBook.title || 'Unknown Title',
    author: Array.isArray(apiBook.author_name) 
      ? apiBook.author_name.slice(0, 2).join(', ') 
      : apiBook.author_name || 'Unknown Author',
    coverUrl: apiBook.cover_i 
      ? `https://covers.openlibrary.org/b/id/${apiBook.cover_i}-M.jpg`
      : `https://picsum.photos/300/400?random=${workId}`,
    publishYear: apiBook.first_publish_year?.toString() || '2023',
    category: category.charAt(0).toUpperCase() + category.slice(1),
    pages: Math.floor(Math.random() * 400 + 200).toString(), // Random pages 200-600
    language: Array.isArray(apiBook.language) 
      ? (apiBook.language.includes('eng') ? 'English' : apiBook.language[0]) 
      : 'English',
    rating: (Math.random() * 1.5 + 3.5).toFixed(1), // Random rating 3.5-5.0
    description: `An excellent ${category} resource from Open Library. ${apiBook.title} provides comprehensive coverage of essential topics and concepts. This book is perfect for students, professionals, and anyone interested in expanding their knowledge in ${category}.`,
    isbn: `978-${Math.floor(Math.random() * 9000000000 + 1000000000)}`, // Generate fake ISBN
    editionCount: apiBook.edition_count || 1,
    hasFulltext: apiBook.has_fulltext || false,
    ebookAccess: apiBook.ebook_access || 'no_ebook'
  };
};