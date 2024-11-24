// src/LoginForm.js

import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import { AuthContext } from './AuthContext'; // Importez le contexte

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext); // Récupérez la fonction login du contexte
    const navigate = useNavigate(); // Initialisez le hook useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { email, password } = credentials;

        // Simuler une requête de connexion avec des données fictives
        const dummyData = {
            email: 'test@example.com',
            password: 'password123',
        };

        try {
            // Simulation d'une requête de connexion
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Vérification des identifiants
                    if (email === dummyData.email && password === dummyData.password) {
                        resolve({ success: true });
                    } else {
                        reject(new Error('Identifiants incorrects'));
                    }
                }, 1000);
            });

            // Si la connexion réussit
            login(email); // Mettez à jour le contexte
            Swal.fire({
                icon: 'success',
                title: 'Connexion réussie',
                text: `Bienvenue ${email}!`, // Message de bienvenue avec l'email
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/'); // Redirige vers la page d'accueil
            });

            // Réinitialiser le formulaire
            setCredentials({ email: '', password: '' });
        } catch (error) {
            // Afficher une alerte d'erreur
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: error.message,
                confirmButtonText: 'OK',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-5">
            <h2 className="text-2xl font-bold mb-5">Connexion</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={credentials.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={credentials.password}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white font-semibold rounded-md p-2 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                    {loading ? 'Connexion...' : 'Se connecter'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
