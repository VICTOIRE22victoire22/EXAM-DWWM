import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

// Composants
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import RecipeForm from "./components/RecipeForm";
import FavoriteRecipes from "./components/FavoriteRecipes";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [typeOfCuisines, setTypeOfCuisines] = useState([]);

  // Chargement initial des données
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesRes, categoriesRes, typeOfCuisinesRes] = await Promise.all([
          fetch("http://localhost:3000/recipes"),
          fetch("http://localhost:3000/categories"),
          fetch("http://localhost:3000/typeOfCuisines"),
        ]);

        if (!recipesRes.ok || !categoriesRes.ok || !typeOfCuisinesRes.ok) {
          throw new Error("Erreur lors du chargement des données");
        }

        const recipesData = await recipesRes.json();
        const categoriesData = await categoriesRes.json();
        const typeOfCuisinesData = await typeOfCuisinesRes.json();

        setRecipes(recipesData);
        setCategories(categoriesData);
        setTypeOfCuisines(typeOfCuisinesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Ajoute une nouvelle recette à la liste
  const handleAddRecipe = (newRecipe) => {
    setRecipes((prev) => [...prev, newRecipe]);
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home recipes={recipes} categories={categories} />}
        />
        <Route path="/recettes" element={<RecipeList recipes={recipes} />} />
        <Route path="/details/:id" element={<RecipeDetail recipes={recipes} />} />
        <Route
          path="/formulaire"
          element={
            <RecipeForm
              onAddRecipe={handleAddRecipe}
              categories={categories}
              typeOfCuisines={typeOfCuisines}
            />
          }
        />
        <Route path="/favoris" element={<FavoriteRecipes recipes={recipes} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
