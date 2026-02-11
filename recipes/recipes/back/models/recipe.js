const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({

    title: {              // Titre de la recette
        required: true,
        type: String
    },
    image: {              // Image de la recette
        required: true,
        type: String
    },
    preparationTime: {     // Temps de préparation en minutes
        type: Number
    },
category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category",
  required: true
},
typeOfCuisine: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "TypeOfCuisine",
  required: true
},

    ingredients: {          // Ingrédients
        required: true,
        type: [String]
    },
    steps: {                // Étapes de préparation
        required: true,     
        type: [String]      
    },
    servings: {             // Nombre de portions
        type: Number
    },
    tips: {                 // Conseils
        required: true,
        type: [String]
    }

});

// Export du modèle Recipe pour l'utiliser ailleurs dans l'application
module.exports = mongoose.model('Recipe', recipeSchema,);

