export const constructImageUrl = (coverId) => {
    return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : 'https://via.placeholder.com/150';
};

export const handleMissingData = (data, defaultValue) => {
    return data ? data : defaultValue;
};