import { useState, useEffect } from 'react';
import { fetchBooks } from '../services/bookService';

const useBookSearch = (query) => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) return;

        const searchBooks = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchBooks(query);
                setBooks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        searchBooks();
    }, [query]);

    return { books, isLoading, error };
};

export default useBookSearch;