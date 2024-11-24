// src/pages/ArticleDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importer useNavigate
import axios from 'axios';
import { useCart } from './CartContext'; // Assurez-vous que le CartContext est bien importé
import { ToastContainer, toast } from 'react-toastify'; // Importer ToastContainer et toast
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles de Toastify

const ArticleDetailsPage = () => {
    const { id } = useParams(); // Récupérer l'ID de l'article depuis l'URL
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart(); // Utilisation du contexte du panier
    const navigate = useNavigate(); // Hook pour naviguer

    useEffect(() => {
        const fetchArticleDetails = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setArticle(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de l\'article:', error);
                setLoading(false);
            }
        };

        fetchArticleDetails();
    }, [id]);

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (!article) {
        return <div>Article non trouvé.</div>;
    }

    const handleAddToCart = () => {
        addToCart(article); // Ajout au panier
        toast.success(`Vous avez ajouté "${article.title}" au panier`);
    };

    return (
        <div className="container mx-auto flex flex-row items-start justify-center min-h-screen py-6 space-x-8">
            {/* Colonne gauche pour l'image du produit */}
            <div className="w-1/2 mb-6">
                <img src={article.images[0]} alt={article.title} className="w-full h-auto rounded shadow-lg" />
            </div>
            {/* Colonne droite pour les détails du produit */}
            <div className="w-1/2 flex flex-col items-start">
                <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
                <p className="text-xl font-semibold text-gray-800 mb-4">${article.price}</p>
                <p className="text-md text-gray-600 mb-4">{article.description}</p>

                {/* Section d'achat */}
                <div className="flex flex-col items-start">
                    <button 
                        className="bg-green-500 text-white text-lg py-3 px-6 rounded shadow hover:bg-green-600 transition duration-200"
                        onClick={handleAddToCart} // Ajout de l'appel à la fonction pour ajouter au panier
                    >
                        Ajouter au panier
                    </button>
                </div>
                {/* Lien de redirection vers la page précédente */}
                <button 
                    className="mt-4 text-blue-500 underline"
                    onClick={() => navigate(-1)} // Navigation vers la page précédente
                >
                    Retour
                </button>
            </div>

            {/* Notification Container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default ArticleDetailsPage;
