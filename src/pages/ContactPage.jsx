import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Assurez-vous d'avoir SweetAlert2 installé

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const { name, email, message } = formData;

        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('message', message);
        data.append('access_key', '7a0b826a-bfa8-46ea-bd07-0ec7873ad1ab'); // Ta clé d'accès Web3Forms

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();
            if (result.success) {
                // Affiche une alerte de succès
                Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Votre message a été envoyé avec succès !',
                    confirmButtonText: 'OK',
                });
                // Réinitialise le formulaire après le succès
                setFormData({ name: '', email: '', message: '' });
            } else {
                // Affiche une alerte d'erreur
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur est survenue. Veuillez réessayer.',
                    confirmButtonText: 'OK',
                });
            }
        } catch (err) {
            // Affiche une alerte d'erreur en cas d'exception
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue. Veuillez réessayer.',
                confirmButtonText: 'OK',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-5">
            <h2 className="text-2xl font-bold mb-5">Contactez-nous</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        rows="4"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white font-semibold rounded-md p-2 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                    {loading ? 'Envoi...' : 'Envoyer'}
                </button>
            </form>
        </div>
    );
};

export default ContactPage;
