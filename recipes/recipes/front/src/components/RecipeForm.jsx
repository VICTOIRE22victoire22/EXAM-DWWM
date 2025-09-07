import { useNavigate } from "react-router";
import { useState } from "react";
import "../assets/RecipeForm.css";

const RecipeForm = ({ onAddRecipe, categories }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Champs du formulaire
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [servings, setServings] = useState("");
  const [tips, setTips] = useState("");
  const [image, setImage] = useState("");

  // Validation titre en direct
  const handleTitleChange = (value) => {
    setTitle(value);
    setTitleError(
      value.trim().length < 3 ? "Le titre doit faire minimum 3 caractères" : ""
    );
  };

  // Soumission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      setTitleError("Le titre doit faire minimum 3 caractères");
      return;
    }

    setIsLoading(true);

    const newRecipe = {
      title,
      description,
      ingredients: ingredients
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
      steps: steps
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
      category: selectedCategory,
      preparationTime,
      servings,
      tips,
      image
    };

    try {
      const response = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe)
      });

      if (!response.ok) throw new Error("Erreur lors de la création de la recette");

      const createdRecipe = await response.json();

      // Mise à jour dans App.jsx
      onAddRecipe(createdRecipe);

      navigate("/");
    } catch (error) {
      alert("Erreur réseau, veuillez réessayer.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Création de recette</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Titre
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
          />
          {titleError && <p className="error">{titleError}</p>}
        </label>

        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>

        <label>
          Ingrédients
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </label>

        <label>
          Étapes de préparation
          <textarea value={steps} onChange={(e) => setSteps(e.target.value)} required />
        </label>

        <label>
          Temps de préparation
          <input type="text" value={preparationTime} onChange={(e) => setPreparationTime(e.target.value)} required />
        </label>

        <label>
          Nombre de portions
          <input type="number" value={servings} onChange={(e) => setServings(e.target.value)} required />
        </label>

        <label>
          Conseils de cuisine
          <textarea value={tips} onChange={(e) => setTips(e.target.value)} />
        </label>

        <label>
          Catégorie
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
            <option value="">-- Sélectionner --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Image (URL)
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </label>

        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <button type="submit">Créer la recette</button>
        )}
      </form>
    </div>
  );
};

export default RecipeForm;
