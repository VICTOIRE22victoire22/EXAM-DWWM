const express = require('express');

const router = express.Router();
// Importation du contrôleur pour gérer les types de cuisine
const TypeOfCuisineController = require('../controllers/typeOfCuisine.controller');
// Route pour créer un nouveau type de cuisine
router.post('/', TypeOfCuisineController.create);
// Route pour récupérer tous les types de cuisine
router.get('/', TypeOfCuisineController.getAll);
// Route pour supprimer un type de cuisine par son ID
router.delete('/:id', TypeOfCuisineController.delete);

module.exports = router;