import React from 'react';
import { useCart } from './CartContext'; // Assurez-vous d'importer correctement votre contexte panier
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const CartPage = () => {
    const { cartItems, removeFromCart, getTotalPrice, clearCart, addToCart, decreaseCartQuantity } = useCart(); // Ajout de addToCart et decreaseCartQuantity

    const handlePurchase = () => {
        toast.success('Achat réalisé avec succès!');
        clearCart(); // Vider le panier après l'achat
    };

    const handleClearCart = () => {
        clearCart();
        toast.info('Votre panier a été vidé.');
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
                <Link to="/produits" className="text-blue-500 hover:underline">
                    Retourner aux produits
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Votre panier</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Liste des articles dans le panier */}
                <div className="bg-white p-4 rounded shadow-md">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border-b py-4">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-20 w-20 object-cover rounded"
                            />
                            <div className="ml-4 flex-grow">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-gray-700">${item.price}</p>
                                
                                {/* Gestion des quantités */}
                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={() => decreaseCartQuantity(item.id)} // Retirer une unité
                                        className="bg-gray-200 text-gray-800 py-1 px-2 rounded mr-2"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg mx-2">{item.quantity}</span> {/* Affichage de la quantité */}
                                    <button
                                        onClick={() => addToCart(item)} // Ajouter une unité
                                        className="bg-gray-200 text-gray-800 py-1 px-2 rounded ml-2"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:underline mt-2"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section Total et Achat */}
                <div className="bg-white p-4 rounded shadow-md flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Résumé de la commande</h3>
                        <p className="text-lg">
                            Total: <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
                        </p>
                    </div>
                    <button
                        onClick={handlePurchase}
                        className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600"
                    >
                        Acheter
                    </button>
                    <button
                        onClick={handleClearCart}
                        className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600"
                    >
                        Vider le panier
                    </button>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default CartPage;
