import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';
import { useCart } from '../pages/CartContext';

const Header = () => {
    const { isAuthenticated, logout } = useAuth(); // Gestion de la connexion
    const { cartItems, getTotalPrice } = useCart(); // Gestion du panier
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
            {/* Logo de la boutique */}
            <Link to="/" className="text-3xl font-bold hover:text-yellow-500">
                Madadis
            </Link>

            {/* Navigation */}
            <nav className="flex space-x-6 text-lg">
                <Link to="/" className="hover:text-yellow-500">Accueil</Link>
                <Link to="/blog" className="hover:text-yellow-500">Blog</Link>
                <Link to="/produits" className="hover:text-yellow-500">Produits</Link>
                <Link to="/contact" className="hover:text-yellow-500">Contact</Link>
            </nav>

            {/* Section Panier et Connexion/Déconnexion */}
            <div className="flex items-center space-x-4">
                {/* Panier */}
                <Link to="/cart" className="relative hover:text-yellow-500">
                    <span>Panier</span>
                    {/* Nombre d'articles dans le panier */}
                    {cartItems.length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItems.length}
                        </span>
                    )}
                    {/* Afficher le total du panier */}
                    {cartItems.length > 0 && (
                        <span className="ml-2">Total: ${getTotalPrice().toFixed(2)}</span>
                    )}
                </Link>

                {/* Gestion de la connexion/déconnexion */}
                {isAuthenticated ? (
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                    >
                        Déconnexion
                    </button>
                ) : (
                    <Link 
                        to="/login" 
                        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                    >
                        Connexion
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
