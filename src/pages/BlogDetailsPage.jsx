import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BlogDetailsPage = () => {
  const { id } = useParams(); // Récupérer l'ID de l'article à partir des paramètres de l'URL
  const [article, setArticle] = useState(null); // État pour stocker l'article
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/articles/${id}`);
        setArticle(response.data); // Stocker l'article récupéré
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération de l\'article.'); // Gérer l'erreur
        toast.error('Erreur lors de la récupération de l\'article.');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]); // Dépendance sur l'ID de l'article

  if (loading) {
    return <div>Chargement de l'article...</div>; // Afficher un message de chargement
  }

  if (error) {
    return <div>{error}</div>; // Afficher un message d'erreur
  }

  if (!article) {
    return <div>Aucun article trouvé.</div>; // Si aucun article n'est trouvé
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-2">{new Date(article.date).toLocaleDateString()}</p>
      <h2 className="text-xl font-semibold mb-2">Description</h2>
      <p className="text-gray-700 mb-4">{article.description}</p>
      <h2 className="text-xl font-semibold mb-2">Contenu</h2>
      <p className="text-gray-700">{article.content}</p>
    </div>
  );
};

export default BlogDetailsPage;
