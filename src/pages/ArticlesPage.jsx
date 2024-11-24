// src/pages/ArticlesPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from './CartContext';

const ArticlesPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5); // Nombre d'articles par page
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // État pour la barre de recherche

    const { addToCart } = useCart(); // Utilisation du contexte du panier

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filtrer les produits en fonction du terme de recherche
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculer les articles à afficher pour la page actuelle
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleAddToCart = (product) => {
        addToCart(product); // Ajout au panier
        toast.success(`Vous avez ajouté "${product.title}" au panier`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Liste des Articles</h1>

            {/* Barre de recherche */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded w-full py-2 px-3"
                />
            </div>

            {/* Bouton pour ajouter un produit */}
            <Link to="/produit/ajouter">
                <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
                    Ajouter un Produit
                </button>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
                            <img src={product.images[0]} alt={product.title} className="h-48 w-full object-cover rounded" />
                            <h2 className="text-xl font-semibold">{product.title}</h2>
                            <p className="text-gray-700">{product.description}</p>
                            <p className="font-bold">${product.price}</p>
                            <div className="flex justify-between mt-4">
                                <Link to={`/produit/${product.id}`}>
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded">
                                        Voir les détails
                                    </button>
                                </Link>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Empêcher le clic sur le bouton de déclencher le lien
                                        handleAddToCart(product); // Appel à la fonction handleAddToCart
                                    }}
                                    className="bg-green-500 text-white py-2 px-4 rounded"
                                >
                                    Ajouter au panier
                                </button>
                                {/* Bouton de modification du produit */}
                                <Link to={`/produit/modifier/${product.id}`}>
                                    <button className="bg-yellow-500 text-white py-2 px-4 rounded">
                                        Modifier
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun produit trouvé.</p>
                )}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default ArticlesPage;
