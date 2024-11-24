import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importer Link et useNavigate

const BlogPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Utilisé pour la redirection

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/articles');
                setArticles(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors de la récupération des articles:', err);
                setError('Erreur de chargement des articles.');
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <div>Chargement des articles...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-4">Articles de Blog</h1>
            <div className="mb-4">
                <Link
                    to="/blog/create"
                    className="bg-green-500 text-white py-2 px-4 rounded"
                >
                    Ajouter un article
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article) => (
                    <div key={article.id} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold">{article.title}</h2>
                        <p className="text-gray-700">{article.description}</p>
                        <div className="mt-4">
                            <Link 
                                to={`/article/${article.id}`} 
                                className="bg-blue-500 text-white py-2 px-4 rounded inline-block mr-2"
                            >
                                Lire plus
                            </Link>
                            <button 
                                onClick={() => navigate(`/article/edit/${article.id}`)} 
                                className="bg-yellow-500 text-white py-2 px-4 rounded"
                            >
                                Modifier
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
