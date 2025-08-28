# Book Finder Application

## Overview
The Book Finder application is a React-based web application that allows users to search for books using the Open Library API. It provides a user-friendly interface to display book information, including cover images, titles, authors, and publication years.

## Features
- Search for books by title or author.
- Display a list of books with relevant details.
- View detailed information about a selected book.
- Responsive design using Tailwind CSS.

## Technologies Used
- React 19
- Vite
- Tailwind CSS
- Open Library API

## Project Structure
```
book-finder-app
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── BookCard.jsx
│   │   ├── BookList.jsx
│   │   ├── SearchBar.jsx
│   │   └── Header.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   └── BookDetails.jsx
│   ├── hooks
│   │   └── useBookSearch.js
│   ├── services
│   │   └── bookService.js
│   ├── utils
│   │   └── helpers.js
│   ├── styles
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd book-finder-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage
- Use the search bar to find books by entering a title or author name.
- Click on a book card to view more details about the selected book.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.