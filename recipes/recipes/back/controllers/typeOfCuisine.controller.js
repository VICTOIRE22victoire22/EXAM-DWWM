// controllers/TypeOfCuisine.controller.js
const TypeOfCuisine = require('../models/TypeOfCuisine');

class TypeOfCuisineController {
  async getAll(req, res) {
    try {
      const typeOfCuisines = await TypeOfCuisine.find();
      res.json(typeOfCuisines);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }

  async create(req, res) {
    try {
      const typeOfCuisine = await TypeOfCuisine.create(req.body);
      res.status(201).json(typeOfCuisine);
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la création du type de cuisine", error });
    }
  }

  // ← remets-la bien à l'intérieur de la classe
  async delete(req, res) {
    try {
      const { id } = req.params;
      const typeOfCuisine = await TypeOfCuisine.findByIdAndDelete(id);
      if (!typeOfCuisine) {
        return res.status(404).json({ message: "Type de cuisine non trouvé" });
      }
      res.json({ message: "Type de cuisine supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression du type de cuisine", error });
    }
  }
}

module.exports = new TypeOfCuisineController();

