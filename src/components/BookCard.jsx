// import React, { useState } from 'react';

// const BookCard = ({ book, onClick, showHoverDetails = false, size = "normal" }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   const handleImageError = () => {
//     setImageError(true);
//   };

//   const truncateText = (text, maxLength) => {
//     return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
//   };

//   // Fixed dimensions for all cards - book aspect ratio (2:3)
//   const cardDimensions = {
//     width: "w-64",      // Fixed width: 256px
//     height: "h-[400px]", // Fixed height: 400px
//     imageHeight: "h-[280px]", // Image: 280px (70% of card)
//     contentHeight: "h-[120px]" // Content: 120px (30% of card)
//   };

//   return (
//     <div 
//       className={`group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border border-gray-100 hover:border-gray-300 ${cardDimensions.width} ${cardDimensions.height} flex flex-col`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={onClick}
//     >
//       {/* Book Cover - Fixed Size */}
//       <div className={`relative overflow-hidden ${cardDimensions.imageHeight} flex-shrink-0`}>
//         {!imageError ? (
//           <img
//             src={book.coverUrl}
//             alt={book.title}
//             className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300`}
//             onError={handleImageError}
//             style={{ objectPosition: 'center center' }}
//           />
//         ) : (
//           <div className={`w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
//             <div className="text-center">
//               <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//               </svg>
//               <p className="text-xs text-gray-500 font-medium">No Cover</p>
//             </div>
//           </div>
//         )}

//         {/* Minimal Hover Overlay */}
//         {isHovered && showHoverDetails && (
//           <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <div className="text-center">
//               <p className="text-white text-base font-medium tracking-wide">
//                 Read More
//               </p>
//               <div className="w-8 h-px bg-white mx-auto mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
//             </div>
//           </div>
//         )}

//         {/* Quick Action Buttons - Minimal */}
//         <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <div className="flex space-x-1">
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log('Added to favorites:', book.title);
//               }}
//               className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white hover:scale-105 transition-all duration-200"
//               title="Add to favorites"
//             >
//               <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//               </svg>
//             </button>
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log('Added to collection:', book.title);
//               }}
//               className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white hover:scale-105 transition-all duration-200"
//               title="Add to collection"
//             >
//               <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Book Details - Fixed Size Content Area */}
//       <div className={`p-4 ${cardDimensions.contentHeight} flex flex-col justify-between`}>
//         {/* Title and Author - Fixed Layout */}
//         <div className="flex-1">
//           {/* Book Title */}
//           <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
//             {truncateText(book.title, 50)}
//           </h3>
          
//           {/* Author */}
//           <p className="text-gray-600 text-xs font-medium line-clamp-1">
//             by {truncateText(book.author, 35)}
//           </p>
//         </div>
        
//         {/* Bottom Info - Minimal */}
//         <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-2 border-t border-gray-100">
//           <span className="bg-gray-50 px-2 py-1 rounded-md font-medium">
//             {book.publishYear || 'N/A'}
//           </span>
//           <div className="flex items-center space-x-2">
//             <span className="flex items-center">
//               <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               PDF
//             </span>
//             {book.pages && (
//               <span className="text-gray-400">
//                 {book.pages}p
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookCard;
import React from 'react';

const BookCard = ({ book, onBookClick }) => {
  const handleClick = () => {
    console.log('📚 BookCard clicked:', book);
    if (onBookClick) {
      onBookClick(book);
    } else {
      console.warn('⚠️ No onBookClick handler provided to BookCard');
    }
  };

  // Get cover image URL
  const getCoverUrl = () => {
    if (book.coverUrl) return book.coverUrl;
    if (book.cover_i) return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    return `https://via.placeholder.com/200x300/6366f1/ffffff?text=${encodeURIComponent(book.title?.slice(0, 20) || 'Book')}`;
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={getCoverUrl()}
          alt={book.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/200x300/6366f1/ffffff?text=${encodeURIComponent(book.title?.slice(0, 20) || 'Book')}`;
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
          {book.title || 'Untitled'}
        </h3>
        <p className="text-gray-600 text-xs mb-2">
          by {book.author || book.author_name?.[0] || 'Unknown Author'}
        </p>
        <p className="text-gray-500 text-xs">
          {book.first_publish_year || book.publishYear || 'Year unknown'}
        </p>
      </div>
    </div>
  );
};

export default BookCard;