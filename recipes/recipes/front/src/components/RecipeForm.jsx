import { useNavigate } from "react-router";
import { useState } from "react";
import "../assets/RecipeForm.css";

const RecipeForm = ({ onAddRecipe, categories = [], typeOfCuisines = [] }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Champs du formulaire
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [preparationTime, setPreparationTime] = useState("");

  const [servings, setServings] = useState("");
  const [tips, setTips] = useState("");
  const [image, setImage] = useState("");

  // Type de cuisine (sélection ou création)
  const [typeOfCuisineId, setTypeOfCuisineId] = useState("");
  const [newTypeOfCuisineName, setNewTypeOfCuisineName] = useState("");
  const [typeError, setTypeError] = useState("");

  // Validation titre en direct
  const handleTitleChange = (value) => {
    setTitle(value);
    setTitleError(
      value.trim().length < 3 ? "Le titre doit faire minimum 3 caractères" : ""
    );
  };

  // Soumission (sans ensure)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTypeError("");

    if (title.trim().length < 3) {
      setTitleError("Le titre doit faire minimum 3 caractères");
      return;
    }

    if (!selectedCategory) {
      setTypeError("Veuillez sélectionner une catégorie.");
      return;
    }

    setIsLoading(true);
    try {
      // 1) Résoudre l'ID du type de cuisine
      let finalTypeId = typeOfCuisineId; // _id choisi dans le select
      const typedName = newTypeOfCuisineName.trim();

      if (typedName) {
        // Créer le type de cuisine et récupérer son id
        const resType = await fetch("http://localhost:3000/typeOfCuisines", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: typedName }),
        });

        if (!resType.ok) {
          const txt = await resType.text().catch(() => "");
          throw new Error(`Erreur création type de cuisine: ${resType.status} ${txt}`);
        }

        const createdType = await resType.json();
        // Compatibilité { _id } ou { id }
        finalTypeId = createdType._id ?? createdType.id;
        setTypeOfCuisineId(""); // reset select
      }

      if (!finalTypeId) {
        setTypeError("Veuillez sélectionner un type de cuisine ou en saisir un nouveau.");
        setIsLoading(false);
        return;
      }

      // 2) Construire la payload recette
      const newRecipe = {
        title: title.trim(),
        ingredients: ingredients
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        steps: steps
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),

        // ⚠️ IMPORTANT : ton schéma attend `category` et `typeOfCuisine` (ObjectId)
        category: selectedCategory,
        typeOfCuisine: finalTypeId,

        preparationTime: preparationTime.trim(), // string si schéma String
        servings: Number(servings) || 0,
        tips: tips.trim(), // string si schéma String
        image: image.trim(),
      };

      // 3) Créer la recette
      const response = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        const txt = await response.text().catch(() => "");
        throw new Error(`Erreur lors de la création de la recette: ${response.status} ${txt}`);
      }

      const createdRecipe = await response.json();
      onAddRecipe(createdRecipe);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message || "Erreur réseau, veuillez réessayer.");
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

            // À chaque modification du champ, on récupère la valeur saisie
            // puis on l'envoie à la fonction handleTitleChange().
            // Cela permet de mettre à jour le titre en temps réel
            // et d'appliquer la validation immédiate (ex : minimum 3 caractères).
            onChange={(e) => handleTitleChange(e.target.value)}
            required
          />
          {titleError && <p className="error">{titleError}</p>}
        </label>

        <label>
          Ingrédients
          <textarea
            value={ingredients}

            // À chaque modification dans le textarea, on met à jour l'état "ingredients"
            // avec le contenu saisi par l'utilisateur.
            // Cela permet de stocker en temps réel la liste des ingrédients,
            // qui sera ensuite envoyée lors de la création de la recette.
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </label>

        <label>
          Étapes de préparation
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          />
        </label>

        <label>
          Temps de préparation
          <input
            type="text"
            value={preparationTime}
            onChange={(e) => setPreparationTime(e.target.value)}
            required
          />
        </label>

        <label>
          Nombre de portions
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
          />
        </label>

        <label>
          Conseils de cuisine
          <textarea value={tips} 
          onChange={(e) => setTips(e.target.value)} />
        </label>

        <label>
          Catégorie
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">-- Sélectionner --</option>
            {categories.map((category) => (
              <option
                key={category.id ?? category._id}
                value={category.id ?? category._id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <fieldset style={{ border: 0, padding: 0, margin: "12px 0" }}>
          <legend>Type de cuisine</legend>

          <label>
            Sélectionner un type existant
            <select
              value={typeOfCuisineId}
              onChange={(e) => setTypeOfCuisineId(e.target.value)}
              disabled={newTypeOfCuisineName.trim().length > 0}
            >
              <option value="">-- Sélectionner --</option>
              {typeOfCuisines.map((typeOfCuisine) => (
                <option
                  key={typeOfCuisine.id ?? typeOfCuisine._id}
                  value={typeOfCuisine.id ?? typeOfCuisine._id}
                >
                  {typeOfCuisine.name}
                </option>
              ))}
            </select>
          </label>

          <div style={{ margin: "8px 0", fontStyle: "italic" }}>ou</div>

          <label>
            Nouveau type de cuisine
            <input
              type="text"
              placeholder="ex : Tex-Mex"
              value={newTypeOfCuisineName}
              onChange={(e) => setNewTypeOfCuisineName(e.target.value)}
              // Le champ est désactivé si un type de cuisine existant a déjà été sélectionné.
              // Boolean(typeOfCuisineId) renvoie true lorsque l'utilisateur a choisi un type,
              // afin d'éviter qu'il saisisse en même temps un nouveau type personnalisé.
              // Cela garantit que l'utilisateur ne peut choisir qu'une seule option à la fois.
              disabled={Boolean(typeOfCuisineId)}
            />
          </label>

          {typeError && <p className="error">{typeError}</p>}
        </fieldset>

        <label>
          Image (URL)
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>

        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          // Bouton de validation du formulaire. 
          // Il est automatiquement désactivé lorsque "isLoading" vaut true,
          // ce qui se produit pendant l’envoi de la recette au serveur.
          // Cela empêche l'utilisateur de cliquer plusieurs fois sur "Créer la recette"
          // et évite les doublons ou les erreurs de soumission.
          <button type="submit" disabled={isLoading}>
            Créer la recette
          </button>
        )}
      </form>
    </div>
  );
};

export default RecipeForm;

