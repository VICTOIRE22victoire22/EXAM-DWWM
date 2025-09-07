import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import "../assets/RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();    // Récupère l'identifiant de la recette depuis l'URL
  const [recipe, setRecipe] = useState(null);    // Stocke les données de la recette
  const [loading, setLoading] = useState(true);    // Indique si les données sont en cours de chargement

  useEffect(() => {    // Appelle la fonction pour charger les détails de la recette
    fetchRecipeDetail();
  }, [id]);

    // Fonction pour récupérer les détails d'une recette via l'API
  const fetchRecipeDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3000/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);    // Met à jour l'état avec les données reçues
    } catch (error) {
      console.error("Erreur lors du chargement de la recette :", error);
    } finally {
      setLoading(false);    // Termine le chargement, avec ou sans succès
    }
  };

   // Affiche un message pendant le chargement
  if (loading) return <p>Chargement...</p>;
  // Affiche un message si aucune recette n'a été trouvée
  if (!recipe) return <p>Recette introuvable.</p>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      {recipe.image && <img src={recipe.image} alt={recipe.title}/>}  {/* // Affiche l’image seulement si une image est présente dans la recette */}
{/* Parcourt la liste des ingrédients et les affiche sous forme de liste à puces */}
      <h2>Ingrédients</h2>
      <ul>
        {recipe.ingredients.map((ing) => (
          <li key={ing}>{ing}</li>  // Affiche chaque ingrédient dans une liste avec une clé unique
        ))}
      </ul>

      <h2>Étapes de préparation</h2>
      <ol>
        {recipe.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h3>Temps de préparation : {recipe.preparationTime} minutes</h3>
      <h3>Nombre de portions : {recipe.servings}</h3>

      <h2>Conseils de cuisine</h2>
      <ul>
        {recipe.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetail;



