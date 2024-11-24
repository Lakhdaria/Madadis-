import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AboutPage = () => {
    const location = useLocation(); // Utilisation de useLocation pour obtenir la route active

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-5">
            <h1 className="text-3xl font-bold text-center mb-6">À Propos de Nous</h1>
            <div className="flex space-x-6 mb-10">
                {/* Bouton "Notre Histoire" avec une couleur différente si la route est active */}
                <Link
                    to='notrehistoire' // Pas d'underscore
                    className={`px-6 py-3 font-semibold rounded-lg shadow-md transition duration-300 transform ${
                        location.pathname === '/about/notrehistoire'
                        ? 'bg-green-600 text-white hover:bg-green-700 scale-105' // Bouton sélectionné en vert
                        : 'bg-blue-600 text-white hover:bg-blue-700'    // Bouton normal en bleu
                    }`}
                >
                    Notre Histoire
                </Link>
                {/* Bouton "Notre Vision" avec une couleur différente si la route est active */}
                <Link
                    to='notrevision' // Pas d'underscore
                    className={`px-6 py-3 font-semibold rounded-lg shadow-md transition duration-300 transform ${
                        location.pathname === '/about/notrevision'
                        ? 'bg-green-600 text-white hover:bg-green-700 scale-105' // Bouton sélectionné en vert
                        : 'bg-blue-600 text-white hover:bg-blue-700'    // Bouton normal en bleu
                    }`}
                >
                    Notre Vision
                </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <Outlet />
            </div>
        </div>
    );
};

export default AboutPage;
