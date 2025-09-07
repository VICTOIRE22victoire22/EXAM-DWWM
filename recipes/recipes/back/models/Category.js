// Importation de Mongoose pour gérer la base de données MongoDB
const mongoose = require('mongoose');

// Schéma pour une catégorie
const categorySchema = mongoose.Schema({
    name: {
        type: String
        
    }
})

// Crée le modèle Category à partir du schéma
const Category = mongoose.model('Category', categorySchema);

// Export du modèle Category pour l'utiliser ailleurs dans l'application
module.exports = Category;