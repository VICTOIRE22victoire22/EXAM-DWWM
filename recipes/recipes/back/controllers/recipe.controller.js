// Importe le modèle Recipe
const Recipe = require('../models/recipe');

class RecipeController {

// Récupère toutes les recettes avec leur catégorie, type de cuisine et détails
    async getAll(req, res) {
        try {
            const recipes = await Recipe.find()
                .populate('category')
                .populate('typeOfCuisine');
            res.json(recipes);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors du chargement des recettes", error });
        }
    }
// Récupère une seule recette par son ID
    async getOne(req, res) {
        try {
            const recipe = await Recipe.findById(req.params.id)
                .populate('category')
                .populate('typeOfCuisine');

            if (!recipe) {
                return res.status(404).json({ message: "Recette non trouvée" });
            }
            res.json(recipe);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors du chargement de la recette", error });
        }
    }
/// Crée une nouvelle recette
async create(req, res) {
  try {
    // (temporaire pour debug) voir exactement ce que le front envoie
    // console.log('BODY REÇU:', req.body);

    // Normalisation douce : accepte categoryId / typeOfCuisineId / typeCuisine
    const body = { ...req.body };
    if (!body.category && body.categoryId) body.category = body.categoryId;
    if (!body.typeOfCuisine && (body.typeOfCuisineId || body.typeCuisine)) {
      body.typeOfCuisine = body.typeOfCuisineId || body.typeCuisine;
    }

    if (!body.category || !body.typeOfCuisine) {
      return res.status(400).json({
        message: "Les champs 'category' et 'typeOfCuisine' sont requis (ObjectId)."
      });
    }

    const recipe = await Recipe.create(body);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de la recette", error });
  }
}
// Met à jour une recette existante partiellement
async update(req, res) {
    try {
        const { id } = req.params;

        // Mise à jour partielle avec $set
        await Recipe.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });

        // Récupération de la recette mise à jour avec populate
        const recipe = await Recipe.findById(id)
            .populate('category')
            .populate('typeOfCuisine');

        if (!recipe) {
            return res.status(404).json({ message: "Recette non trouvée" });
        }
        res.json(recipe);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la mise à jour de la recette", error });
    }
}
// Supprime une recette par son ID
    async delete(req, res) {
        try {
            const { id } = req.params;
            const recipe = await Recipe.findByIdAndDelete(id);
            if (!recipe) {
                return res.status(404).json({ message: "Recette non trouvée" });
            }
            res.json({ message: "Recette supprimée avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de la recette", error });
        }
    }
// Recherche les recettes par titre
    async getByTitle(req, res) {
        try {
            const title = req.params.title;
            const recipes = await Recipe.find({
                title: { $regex: new RegExp(title, 'i') }
            })
            .populate('category')
            .populate('typeOfCuisine');
            
            res.json(recipes);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la recherche par titre", error });
        }
    }
}

// Exporte le contrôleur pour l'utiliser dans les routes
module.exports = new RecipeController();