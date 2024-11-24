# Madadis - E-Commerce Project  

## 🛍️ Introduction  
**Madadis** est un site e-commerce front-end développé dans le cadre d'un projet de cours réalisé entre septembre et octobre. Conçu avec **ReactJS** et stylisé grâce à **Tailwind CSS**, ce projet offre une interface utilisateur moderne et réactive. Il interagit avec une base de données back-end via l'API **backendblogReact** pour gérer les données produits, utilisateurs et commandes.

---

## 🌟 Fonctionnalités  

### Front-End  
- **Catalogue de produits** : Affichage dynamique des produits avec leurs informations (images, prix, descriptions).  
- **Design responsive** : Interface adaptée à tous les écrans, développée avec **Tailwind CSS**.  
- **Recherche et filtres** : Fonctionnalités de recherche et de filtrage pour une navigation intuitive.  
- **Routage dynamique** : Navigation entre les pages du site (détails produits, panier, authentification) avec **React Router**.  

### Intégration Back-End  
- **Connexion à l'API** : Récupération et affichage des données produits et utilisateurs via l'API **backendblogReact**.  
- **Gestion des états** : Utilisation des **hooks React** pour la gestion des sessions utilisateurs, du panier et des interactions produits.  

---

## 🛠️ Technologies utilisées  

### Front-End  
- **ReactJS** : Bibliothèque JavaScript pour construire une interface dynamique et basée sur des composants.  
- **Tailwind CSS** : Framework CSS pour créer rapidement un design propre et moderne.  
- **React Router** : Gestion des routes pour un routage fluide et dynamique.  

### Back-End  
- **backendblogReact API** : Service back-end utilisé pour gérer les données des produits, utilisateurs et commandes.  

---

## 📂 Structure du projet  
```plaintext
Madadis/
├── backendBlogReact/        # Dossier pour le code du back-end
├── node_modules/            # Dépendances npm
├── public/                  # Fichiers publics accessibles
├── src/                     # Code source principal
│   ├── assets/              # Images et ressources statiques
│   ├── components/          # Composants réutilisables React
│   ├── pages/               # Pages principales (Accueil, Produits, etc.)
│   ├── App.css              # Styles principaux de l'application
│   ├── App.jsx              # Composant racine de l'application
│   ├── index.css            # Configuration CSS
│   └── main.jsx             # Point d'entrée de l'application
├── .gitignore               # Fichiers ignorés par Git
├── eslint.config.js         # Configuration ESLint
├── index.html               # Point d'entrée HTML
├── package-lock.json        # Verrouillage des dépendances npm
├── package.json             # Dépendances et scripts
├── postcss.config.js        # Configuration PostCSS
├── README.md                # Documentation du projet
├── tailwind.config.js       # Configuration Tailwind CSS
└── vite.config.js           # Configuration Vite


