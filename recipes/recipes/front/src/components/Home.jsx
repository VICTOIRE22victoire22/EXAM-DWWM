import { useEffect, useState } from "react";
import { Link } from "react-router";
import "../assets/Home.css";

// États pour recettes, catégories, types, filtres et favoris
const Home = () => {
  const [recipeLists, setRecipeLists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [typeOfCuisines, setTypeOfCuisines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTypeOfCuisine, setSelectedTypeOfCuisine] = useState("");
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);

// Charge les données au démarrage du composant
  useEffect(() => {
    fetchRecipeLists();
    fetchCategories();
    fetchTypeOfCuisines();
  }, []);

// Récupère les recettes depuis le serveur et met à jour la liste
  const fetchRecipeLists = async () => {
    try {
      const response = await fetch("http://localhost:3000/recipes");
// Si la réponse du serveur n'est pas bonne, on lance une erreur avec le code HTTP
      if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
      const data = await response.json();
      setRecipeLists(data);
// En cas d'erreur lors de la récupération des données, affiche un message d'erreur dans la console
    } catch (error) {
      console.error("Erreur lors du chargement des recettes :", error);
    }
  };

// Récupère les catégories depuis le serveur et met à jour l'état, affiche une erreur si ça échoue
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    }
  };

// Récupère les types de cuisine depuis le serveur et met à jour l'état, affiche une erreur si ça échoue
  const fetchTypeOfCuisines = async () => {
    try {
      const response = await fetch("http://localhost:3000/typeOfCuisines");
      const data = await response.json();
      setTypeOfCuisines(data);
    } catch (error) {
      console.error("Erreur lors du chargement des types de cuisine :", error);
    }
  };

  // Filtre les recettes selon la catégorie et le type de cuisine choisis
  const filteredRecipes = recipeLists.filter((recipe) => {
    const matchCategory = selectedCategory
      ? recipe.category === selectedCategory || recipe.category?._id === selectedCategory
      : true;
    const matchTypeOfCuisine = selectedTypeOfCuisine
      ? recipe.typeOfCuisine === selectedTypeOfCuisine || recipe.typeOfCuisine?._id === selectedTypeOfCuisine
      : true;
    return matchCategory && matchTypeOfCuisine;
  });

// Ajoute une recette aux favoris si elle n'y est pas déjà, sinon affiche un message d'alerte
  const addToFavorites = (recipe) => {
    if (favorites.some((fav) => fav._id === recipe._id)) {
      return alert("Cette recette est déjà dans vos favoris");
    }
    setFavorites([...favorites, recipe]);
  };

// Supprime une recette des favoris en filtrant celle qui a l'id donné
  const removeFromFavorites = (recipeId) => {
    setFavorites(favorites.filter((fav) => fav._id !== recipeId));
  };

// Sauvegarde la liste des favoris dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div>
      <div className="grid">
        <h1>Recettes de cuisine</h1>

        <div className="filters">
          <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
            <option value="">Toutes les catégories</option>  {/* Sélecteur pour choisir une catégorie, avec l' option "Toutes les catégories" */}
            {categories.map((category) => (  // Liste des catégories disponibles dans le menu déroulant
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <select onChange={(e) => setSelectedTypeOfCuisine(e.target.value)} value={selectedTypeOfCuisine}>
            <option value="">Tous les types de cuisine</option>  {/* Sélecteur pour choisir un type de cuisine, avec l' option "Tous types de cuisine" */}
            {typeOfCuisines.map((type) => (   // Liste des types de cuisine disponibles dans le menu déroulant
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="home">
        {filteredRecipes.length > 0 ? (  // Affiche les recettes filtrées si la liste n’est pas vide 
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="recipeList">
              <h2>{recipe.title}</h2>
              <img src={recipe.image} alt={recipe.title} />
              <p>Temps de préparation : {recipe.preparationTime} minutes</p>
              <Link to={`/details/${recipe._id}`}>Voir les détails</Link>
              {favorites.some((fav) => fav._id === recipe._id) ? (  // Si la recette est déjà dans les favoris, afficher le bouton pour la retirer
                <button onClick={() => removeFromFavorites(recipe._id)}>Supprimer des favoris</button>
              ) : (   // Sinon, afficher le bouton pour l’ajouter aux favoris
                <button onClick={() => addToFavorites(recipe)}>Ajouter aux favoris</button>
              )}
            </div>
          ))
        ) : (
          <p>Aucune recette ne correspond à votre sélection.</p>
        )}
      </div>
    </div>
  );
};

export default Home;


