// src/pages/AddEditProductPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEditProductPage = () => {
    const { productId } = useParams(); // Récupération de l'ID du produit pour la modification
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
    });
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (productId) {
            setIsEditMode(true);
            // Récupérer les données du produit si nous sommes en mode modification
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`https://dummyjson.com/products/${productId}`);
                    setProduct(response.data);
                } catch (error) {
                    toast.error('Erreur lors de la récupération du produit');
                }
            };
            fetchProduct();
        }
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                // Modifier le produit existant
                await axios.put(`https://dummyjson.com/products/${productId}`, product);
                toast.success('Produit modifié avec succès');
            } else {
                // Ajouter un nouveau produit
                await axios.post('https://dummyjson.com/products/add', product);
                toast.success('Produit ajouté avec succès');
            }
            navigate('/produits'); // Rediriger vers la page des produits après la soumission
        } catch (error) {
            toast.error('Erreur lors de la soumission du produit');
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">{isEditMode ? 'Modifier un Produit' : 'Ajouter un Produit'}</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={product.title}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        required
                        value={product.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Prix</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        required
                        value={product.price}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        value={product.image}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold rounded-md p-2 transition duration-300 hover:bg-blue-700"
                >
                    {isEditMode ? 'Modifier' : 'Ajouter'} le Produit
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddEditProductPage;
