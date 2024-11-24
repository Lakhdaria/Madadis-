import React, { useEffect, useState } from 'react';

// Dummy Data for Testimonials (can be replaced by API data if needed)
const testimonials = [
    {
        id: 1,
        name: "Alice",
        photo: "https://via.placeholder.com/50",
        rating: 5,
        comment: "Une expérience incroyable, je le recommande à tous !",
    },
    {
        id: 2,
        name: "Bob",
        photo: "https://via.placeholder.com/50",
        rating: 4,
        comment: "Très satisfait de mon achat, service client au top.",
    },
    {
        id: 3,
        name: "Charlie",
        photo: "https://via.placeholder.com/50",
        rating: 5,
        comment: "Le meilleur service que j'ai jamais utilisé !",
    },
];

const HomePage = () => {
    const [articles, setArticles] = useState([]);  // Stocker les articles les plus aimés
    const [loading, setLoading] = useState(true);  // Gérer l'état de chargement

    // Appel à l'API pour récupérer les articles les plus aimés
    useEffect(() => {
        fetch('/api/most-liked-articles') // Remplacez par votre véritable endpoint
            .then(response => response.json())
            .then(data => {
                setArticles(data);  // Enregistrer les articles récupérés
                setLoading(false);  // Arrêter le chargement
            })
            .catch(error => {
                console.error("Erreur lors du chargement des articles:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center py-20">Chargement des articles...</div>;
    }

    return (
        <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Bienvenue sur Notre Site</h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">Votre solution idéale pour tout ce dont vous avez besoin.</p>
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                    Commencer
                </button>
            </section>

            {/* Articles Section */}
            <section className="py-20 bg-white">
                <h2 className="text-3xl text-center font-bold mb-12">Nos Articles les Plus Aimés</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.length === 0 ? (
                        <p className="text-center">Aucun article aimé pour le moment.</p>
                    ) : (
                        articles.map(article => (
                            <div key={article.id} className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
                                <img src={article.image} alt={article.title} className="w-full h-32 object-cover mb-4 rounded-md" />
                                <h3 className="text-xl font-semibold mb-4">{article.title}</h3>
                                <p className="text-gray-600 mb-4">{article.description}</p>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                                    Voir Plus
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20">
                <h2 className="text-3xl text-center font-bold mb-12">Témoignages</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                            <img src={testimonial.photo} alt={testimonial.name} className="w-16 h-16 rounded-full mb-4" />
                            <h3 className="text-lg font-semibold mb-2">{testimonial.name}</h3>
                            <div className="flex mb-2">
                                {Array.from({ length: testimonial.rating }, (_, index) => (
                                    <span key={index} className="text-yellow-400">★</span>
                                ))}
                            </div>
                            <p className="text-gray-600 italic text-center">{testimonial.comment}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-blue-600 py-20 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
                <p className="mb-6">Inscrivez-vous aujourd'hui et profitez de nos fonctionnalités exceptionnelles.</p>
                <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                    S'inscrire
                </button>
            </section>
        </div>
    );
};

export default HomePage;
