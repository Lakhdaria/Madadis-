import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

const CreateBlogPage = () => {
  const navigate = useNavigate(); // Initialiser le hook useNavigate
  const { isAuthenticated } = useContext(AuthContext); // Récupérer le statut d'authentification
  const [article, setArticle] = useState({ title: '', description: '', content: '', date: '' });
  const [loading, setLoading] = useState(false);

  // Vérifiez l'authentification
  if (!isAuthenticated) {
    toast.error('Vous devez être connecté pour ajouter un article.'); // Affiche une notification d'erreur
    setTimeout(() => {
      navigate('/login'); // Rediriger vers la page de connexion après un court délai
    }, 3000); // 3 secondes pour laisser le temps à l'utilisateur de voir le message
    return null; // Ne pas afficher le contenu de la page
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:3000/articles', article);
      toast.success('Article créé avec succès !');
      navigate('/blog'); // Rediriger vers la page des articles
    } catch (err) {
      toast.error('Erreur lors de la création de l\'article.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Ajouter un nouvel article</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Titre
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={article.title}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={article.description}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="content">
            Contenu
          </label>
          <textarea
            id="content"
            name="content"
            value={article.content}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={article.date}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Création...' : 'Créer l\'article'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
