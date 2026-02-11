const mongoose = require('mongoose');

// Schéma pour le type de cuisine
const typeOfCuisineSchema = mongoose.Schema({
    name: {
      type: String
    }
})

// Création du modèle TypeOfCuisine à partir du schéma
const TypeOfCuisine = mongoose.model('TypeOfCuisine', typeOfCuisineSchema);

// Export du modèle TypeOfCuisine pour l'utiliser ailleurs dans l'application
module.exports = TypeOfCuisine;