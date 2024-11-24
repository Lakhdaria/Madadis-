import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

const EditBlogPage = () => {
  const { id } = useParams(); // Récupérer l'ID de l'article à partir des paramètres de l'URL
  const navigate = useNavigate(); // Initialiser le hook useNavigate
  const { isAuthenticated } = useContext(AuthContext); // Récupérer le statut d'authentification
  const [article, setArticle] = useState({ title: '', description: '', content: '', date: '' });
  const [loading, setLoading] = useState(true);

  // Vérifiez l'authentification
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Vous devez être connecté pour modifier un article.');
      navigate('/login'); // Rediriger vers la page de connexion
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/articles/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        toast.error('Erreur lors de la récupération de l\'article.');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/articles/${id}`, article);
      toast.success('Article mis à jour avec succès !');
      navigate(`/article/${id}`); // Rediriger vers la page de détails de l'article
    } catch (err) {
      toast.error('Erreur lors de la mise à jour de l\'article.');
    }
  };

  if (loading) {
    return <div>Chargement de l'article...</div>; // Afficher un message de chargement
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Modifier l'article</h1>
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
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Mettre à jour l'article
        </button>
      </form>
    </div>
  );
};

export default EditBlogPage;
