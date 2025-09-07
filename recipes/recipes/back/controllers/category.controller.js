// Importe le modèle Category
const Category = require('../models/Category');

class CategoryController {

// Récupère toutes les catégories dans la base de données
    async getAll(req, res) {
        const categories = await Category.find();
// Envoie la liste des catégories au format JSON
        res.json(categories);
    }
// Crée une nouvelle catégorie avec les données reçues
    async create(req, res) {
        const category = await Category.create(req.body);
// Envoie la nouvelle catégorie au format JSON
        res.json(category);
    }
}
// Exporte le contrôleur pour l'utiliser dans les routes
module.exports = new CategoryController;