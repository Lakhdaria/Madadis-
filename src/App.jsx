// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ProduitsPage from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import Error404 from './pages/Error404';
import CartPage from './pages/CartPage';
import Header from './components/Header';
import { CartProvider } from './pages/CartContext';
import { AuthProvider } from './pages/AuthContext'; 
import BlogDetailsPage from './pages/BlogDetailsPage'; // Page des détails d'un article
import CreateBlogPage from './pages/CreateBlogPage'; // Page de création d'article
import EditBlogPage from './pages/EditBlogPage'; // Nouvelle page pour modifier un article
import ArticleDetailsPage from './pages/ArticleDetailsPage'; // Page de détails d'article
import AddProductPage from './pages/AddProductPage'; // Nouvelle page pour ajouter un produit
import EditProductPage from './pages/EditProductPage'; // Nouvelle page pour modifier un produit
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/produits" element={<ProduitsPage />} />
            <Route path="/produit/:id" element={<ArticleDetailsPage />} />
            <Route path="/produit/ajouter" element={<AddProductPage />} /> {/* Route pour ajouter un produit */}
            <Route path="/produit/modifier/:id" element={<EditProductPage />} /> {/* Route pour modifier un produit */}
            <Route path="/article/:id" element={<BlogDetailsPage />} />
            <Route path="/blog/create" element={<CreateBlogPage />} />
            <Route path="/article/edit/:id" element={<EditBlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
