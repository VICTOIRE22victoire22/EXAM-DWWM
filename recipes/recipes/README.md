🍽️ Recipes – Application web de gestion de recettes

Recipes est une application web permettant d’afficher, rechercher, consulter et organiser des recettes de cuisine.
Le frontend est développé avec React + Vite, et le backend avec Node.js + Express, connectés à une base de données MongoDB.

🎯 Fonctionnalités

Afficher la liste complète des recettes

Rechercher une recette (titre, catégorie, ingrédients…)

Consulter le détail d’une recette

Ajouter une nouvelle recette via un formulaire

Gérer une liste de recettes favorites

👥 Public visé

Utilisateurs voulant organiser leurs recettes

Personnes cherchant de nouvelles idées culinaires

Amateurs de cuisine souhaitant conserver leurs favoris

🗂️ Architecture du projet
recipes/
├── front/                # Interface utilisateur (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
├── back/                 # API REST (Node.js + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
│
└── README.md


Architecture structurée en deux parties distinctes : Front et Back.

🛠️ Technologies utilisées
Couche	Technologies
Frontend	React, Vite, React Router, Fetch API, CSS3
Backend	Node.js, Express, Nodemon
Base de données	MongoDB, Mongoose
Outils	Git, GitHub, Postman, VS Code

🔄 Axios retiré : le frontend utilise désormais la Fetch API native.

🚀 Installation
🔧 Prérequis
Logiciel	Version
Node.js	≥ 18
MongoDB	Atlas ou installation locale
Git	Dernière version
📥 1. Cloner le projet
git clone https://github.com/ton-dépôt/recipes.git
cd recipes

🖥️ 2. Installation du FRONTEND
cd front
npm install
npm run dev


➡ Frontend accessible à : http://localhost:5173

🖧 3. Installation du BACKEND
cd ../back
npm install
npm run dev


➡ Backend accessible à : http://localhost:3000

🔐 Configuration du fichier .env

Créer un fichier .env dans /back :

MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/
PORT=3000


⚠ Ne jamais versionner ce fichier sur GitHub.

📚 Documentation API
📌 Routes disponibles
Méthode	Endpoint	Description
GET	/recipes	Récupérer toutes les recettes
GET	/recipes/:id	Récupérer une recette par ID
POST	/recipes	Ajouter une nouvelle recette
DELETE	/recipes/:id	Supprimer une recette
Exemple de réponse GET
[
  {
    "title": "Pâtes Carbonara",
    "ingredients": ["Pâtes", "Œufs", "Lardons"],
    "difficulty": "Facile"
  }
]

🏃 Lancement simultané
Terminal 1 – Frontend
cd front
npm run dev

Terminal 2 – Backend
cd back
npm install cors
npx nodemon

🔐 Bonnes pratiques

Utilisation d’un fichier .env pour les données sensibles

Séparation stricte entre frontend et backend

Architecture MVC côté backend

Gestion des erreurs HTTP (404, 500…)

Requêtes frontend organisées dans des services (ex. src/services/recipes.js)

✨ Améliorations futures

Authentification utilisateur

Partage des recettes

Impression d’une recette

Mode hors-ligne (PWA)