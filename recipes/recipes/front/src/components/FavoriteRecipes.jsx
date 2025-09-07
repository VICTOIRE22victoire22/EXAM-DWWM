// Importe les hooks useState et useEffect de React pour gérer l'état et les effets dans le composant
import { useState, useEffect } from "react";
// Importe le composant Link pour créer des liens de navigation entre les pages
import { Link } from "react-router";
import "../assets/Home.css";

// Charge les favoris depuis le localStorage ou crée une liste vide
const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  // Met à jour les favoris dans le localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Supprime une recette des favoris selon son id
  const removeFromFavorites = (recipeId) => {
    const updatedFavorites = favorites.filter((fav) => fav._id !== recipeId);
    setFavorites(updatedFavorites);
  };

  return (   // Affiche le contenu du composant FavoriteRecipes
    <div>
      <h1>Mes recettes favorites</h1>
      {favorites.length === 0 ? (  // Si la liste des favoris est vide, afficher un message, sinon afficher les recettes favorites
        <p>Vous n'avez pas encore ajouté de recettes favorites.</p>
      ) : (
        <div className="home">
          {favorites.map((recipe) => (  // Parcourt la liste des favoris pour afficher chaque recette
            <div key={recipe._id} className="recipeList">
              <h2>{recipe.title}</h2>
              <img src={recipe.image} alt={recipe.title} />
              <p>Temps de préparation : {recipe.preparationTime} minutes</p>
              <Link to={`/details/${recipe._id}`}>Voir les détails</Link>
              <button onClick={() => removeFromFavorites(recipe._id)}>
                Retirer des favoris
              </button>
            </div>
          ))}
        </div>
      )}
    </div>                     
  );
};

// Export du composant FavoriteRecipes pour pouvoir l'utiliser ailleurs
export default FavoriteRecipes;
