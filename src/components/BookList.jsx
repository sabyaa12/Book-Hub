// import React from 'react';
// import BookCard from './BookCard';

// const BookList = ({ books, isLoading, error }) => {
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="text-lg text-gray-600">Searching for books...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="text-lg text-red-600">
//           Error: {error}
//         </div>
//       </div>
//     );
//   }

//   if (books.length === 0) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="text-lg text-gray-600">
//           No books found. Try a different search term.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {books.map((book) => (
//         <BookCard key={book.id} book={book} />
//       ))}
//     </div>
//   );
// };

// export default BookList;
import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, isLoading, error, onBookClick }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-xl h-96"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No books found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book, index) => (
        <BookCard 
          key={book.id || book.key || index} 
          book={book} 
          onBookClick={onBookClick}
        />
      ))}
    </div>
  );
};

export default BookList;