// src/pages/EditProductPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProductPage = () => {
    const { id } = useParams(); // Récupérer l'ID du produit à modifier
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setPrice(response.data.price);
                setImage(response.data.images[0]); // On suppose que c'est le premier élément d'images
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération du produit:', error);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const updatedProduct = {
            title,
            description,
            price: parseFloat(price),
            images: [image],
        };

        try {
            await axios.put(`https://dummyjson.com/products/${id}`, updatedProduct);
            toast.success('Produit modifié avec succès !'); // Notification de succès
        } catch (error) {
            console.error('Erreur lors de la modification du produit:', error);
            toast.error('Erreur lors de la modification du produit.'); // Notification d'erreur
        }
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (!product) {
        return <div>Produit non trouvé.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Modifier le Produit</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Titre
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Prix
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        URL de l'Image
                    </label>
                    <input
                        type="url"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Modifier Produit
                    </button>
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default EditProductPage;
