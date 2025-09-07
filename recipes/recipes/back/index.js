// Importation des modules nécessaires : Express pour le serveur, Mongoose pour la base de données, CORS pour la sécurité
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import des routes pour les recettes, catégories et types de cuisine
const recipeRoutes = require("./routes/recipe.route");
const categoryRoutes = require("./routes/category.route");
const typeOfCuisineRoutes = require("./routes/typeOfCuisine.route");

const app = express();

// Middleware pour lire et convertir les données JSON dans les requêtes
app.use(express.json());
// Middleware pour lire les données envoyées par formulaire
app.use(express.urlencoded({ extended: true }));

// Autorise les requêtes venant de http://localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Fonction pour démarrer le serveur après la connexion à MongoDB
async function startServer() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/exercice-recipeList", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Timeout de 10s pour éviter l'attente infinie
    });

    console.log("✅ Connexion à la base de données effectuée");

    // Routes
    app.use("/recipes", recipeRoutes);
    app.use("/categories", categoryRoutes);
    app.use("/typeOfCuisines", typeOfCuisineRoutes);

    // Lancement du serveur
    app.listen(3000, () => {
      console.log("🚀 Serveur lancé sur http://localhost:3000");
    });
  } catch (error) {
    console.error("❌ Erreur lors de la connexion à MongoDB :", error.message);
    process.exit(1); // Arrête l'app si la connexion échoue
  }
}

// On lance la fonction
startServer();
