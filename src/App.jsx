import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CategoryPage from './pages/CategoryPage';
import CollectionPage from './pages/CollectionPage';
import FavoritesPage from './pages/FavoritesPage';
import DownloadsPage from './pages/DownloadsPage';
import SupportPage from './pages/SupportPage';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;