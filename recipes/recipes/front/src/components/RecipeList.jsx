import { useState, useEffect } from "react";
import { Link } from "react-router";

const RecipeList = ({ recipes }) => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("all");

  // Récupération des catégories depuis le backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/categories");
        if (!res.ok) throw new Error("Erreur lors du chargement des catégories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Filtrage des recettes selon la catégorie sélectionnée
  const filteredRecipes =
    filter === "all"
      ? recipes
      : recipes.filter((recette) => recette.category === filter);

  return (
    <div>
      <h1>Liste des recettes</h1>

      <label>
        Filtrer par catégorie :
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <ul>
        {filteredRecipes.length === 0 ? (
          <p>Aucune recette trouvée.</p>
        ) : (
          filteredRecipes.map((recette) => (
            <li key={recette._id}>
              <h2>{recette.title}</h2>
              {recette.image && (
                <img src={recette.image} alt={recette.title} width="150" />
              )}
              <Link to={`/details/${recette._id}`}>Voir détails</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecipeList;
