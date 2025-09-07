const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/recipe.controller');


// Route pour créer une nouvelle recette
router.post('/', RecipeController.create);
// Route pour récupérer toutes les recettes
router.get('/', RecipeController.getAll);
// Route pour rechercher des recettes par titre
router.get('/search/title/:title', RecipeController.getByTitle);
// Route pour récupérer une recette par son ID
router.get('/:id', RecipeController.getOne);
// Route pour mettre à jour une recette par son ID
router.patch('/:id', RecipeController.update);
// Route pour mettre à jour partiellement une recette par son ID
router.put('/:id', RecipeController.update);
// Route pour supprimer une recette par son ID
router.delete('/:id', RecipeController.delete);

// On exporte le routeur pour l'utiliser dans l'application
module.exports = router;