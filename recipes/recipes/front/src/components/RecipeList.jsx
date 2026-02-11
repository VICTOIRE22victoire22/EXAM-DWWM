import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";

// Permet d'extraire l'_id si la valeur est un objet { _id, name }
const extractId = (value) =>
  value && typeof value === "object" ? value._id : value;

const RecipeList = ({ recipes = [] }) => {
  const [categories, setCategories] = useState([]);
  const [typeOfCuisines, setTypeOfCuisines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTypeOfCuisine, setSelectedTypeOfCuisine] = useState("all");

  // Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des catégories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  // Charger les types de cuisine
  useEffect(() => {
    const fetchTypeOfCuisines = async () => {
      try {
        const response = await fetch("http://localhost:3000/typeOfCuisines");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des types de cuisine");
        }
        const data = await response.json();
        setTypeOfCuisines(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTypeOfCuisines();
  }, []);

  // Filtrer les recettes en fonction de la catégorie et du type sélectionnés
  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((recipe) =>
        selectedCategory === "all"
          ? true
          : extractId(recipe.category) === selectedCategory
      )
      .filter((recipe) =>
        selectedTypeOfCuisine === "all"
          ? true
          : recipe.typeOfCuisine &&
            extractId(recipe.typeOfCuisine) === selectedTypeOfCuisine
      );
  }, [recipes, selectedCategory, selectedTypeOfCuisine]);

  return (
    <div>
      <h1>Liste des recettes</h1>

      <label>
        Filtrer par catégorie :
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Filtrer par type de cuisine :
        <select
          value={selectedTypeOfCuisine}
          onChange={(e) => setSelectedTypeOfCuisine(e.target.value)}
        >
          <option value="all">Tous les types de cuisine</option>
          {typeOfCuisines.map((typeOfCuisine) => (
            <option key={typeOfCuisine._id} value={typeOfCuisine._id}>
              {typeOfCuisine.name}
            </option>
          ))}
        </select>
      </label>

      <ul>
        {filteredRecipes.length === 0 ? (
          <p>
            Aucune recette trouvée.
            {selectedTypeOfCuisine !== "all" && (
              <> Certaines recettes n’ont pas encore de type de cuisine renseigné.</>
            )}
          </p>
        ) : (
          filteredRecipes.map((recipe) => (
            <li key={recipe._id}>
              <h2>{recipe.title}</h2>
              {recipe.image && (
                <img
                  src={recipe.image.trim?.() || recipe.image}
                  alt={recipe.title}
                  width="150"
                />
              )}
              <Link to={`/details/${recipe._id}`}>Voir détails</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecipeList;
