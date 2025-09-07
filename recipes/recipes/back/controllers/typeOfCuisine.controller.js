// Importe le modèle TypeOfCuisine
const TypeOfCuisine = require('../models/TypeOfCuisine');

class TypeOfCuisineController {

// Récupère tous les types de cuisine
    async getAll(req, res) {
        const typeOfCuisines = await TypeOfCuisine.find();

        res.json(typeOfCuisines);
    }

// Crée un nouveau type de cuisine
    async create(req, res) {
        const typeOfCuisine = await TypeOfCuisine.create(req.body);

        res.json(typeOfCuisine);
    }
}

// Exporte le contrôleur pour l'utiliser dans les routes
module.exports = new TypeOfCuisineController;