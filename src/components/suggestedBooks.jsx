import React from 'react';
import BookCard from './BookCard';

const SuggestedBooks = () => {
  // Academic and study-focused suggested books
  const suggestedBooks = [
    {
      id: '/works/OL1234567W',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      publishYear: '2009',
      coverUrl: 'https://covers.openlibrary.org/b/id/8566785-M.jpg'
    },
    {
      id: '/works/OL2345678W',
      title: 'Calculus: Early Transcendentals',
      author: 'James Stewart',
      publishYear: '2015',
      coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg'
    },
    {
      id: '/works/OL3456789W',
      title: 'Campbell Biology',
      author: 'Jane B. Reece',
      publishYear: '2016',
      coverUrl: 'https://covers.openlibrary.org/b/id/8225261-M.jpg'
    },
    {
      id: '/works/OL4567890W',
      title: 'Principles of Economics',
      author: 'N. Gregory Mankiw',
      publishYear: '2017',
      coverUrl: 'https://covers.openlibrary.org/b/id/7222335-M.jpg'
    },
    {
      id: '/works/OL5678901W',
      title: 'Chemistry: The Central Science',
      author: 'Theodore L. Brown',
      publishYear: '2017',
      coverUrl: 'https://covers.openlibrary.org/b/id/10521270-M.jpg'
    },
    {
      id: '/works/OL6789012W',
      title: 'Physics for Scientists and Engineers',
      author: 'Raymond A. Serway',
      publishYear: '2018',
      coverUrl: 'https://covers.openlibrary.org/b/id/8225454-M.jpg'
    },
    {
      id: '/works/OL7890123W',
      title: 'Psychology: The Science of Mind',
      author: 'Michael W. Passer',
      publishYear: '2016',
      coverUrl: 'https://covers.openlibrary.org/b/id/8567239-M.jpg'
    },
    {
      id: '/works/OL8901234W',
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      publishYear: '1988',
      coverUrl: 'https://covers.openlibrary.org/b/id/6979861-M.jpg'
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Popular Academic Books
        </h2>
        <p className="text-lg text-gray-600">
          Essential textbooks and references for college students
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {suggestedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedBooks;