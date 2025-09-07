// Création d'un routeur Express pour définir les routes
const express = require('express');

// Création d'un routeur pour gérer les chemins d'URL
const router = express.Router();

// Importation du contrôleur des catégories pour gérer les actions
const CategoryController = require('../controllers/category.controller');

// Route pour créer une nouvelle catégorie
router.post('/', CategoryController.create);

// Route pour récupérer toutes les catégories
router.get('/', CategoryController.getAll);

// On exporte le routeur pour l'utiliser dans l'application
module.exports = router;