import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import logo from '../img/recettapp.jpg';
import '../assets/Header.css';


// Composant Header avec stockage des recettes et du texte de recherche
const Header = () => {
  const [recipeLists, setRecipeLists] = useState([]);
  const [search, setSearch] = useState('');

  
// Recherche des recettes avec le texte saisi, et mise à jour de la liste des recettes
// Gestion des erreurs si la requête échoue  
  useEffect(() => {
    const fetchRecipeLists = async () => {
      try {
        const response = await fetch(`http://localhost:3000/recipes/search/title/${search}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la recherche");
        }
        const data = await response.json();
        setRecipeLists(data);
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
        setRecipeLists([]);
      }
    };

    // Si le texte de recherche n'est pas vide, on lance la recherche, sinon, on vide la liste des recettes affichées
    if (search.length > 0) {
      fetchRecipeLists();
    } else {
      setRecipeLists([]);
    }
  }, [search]);

  return (
    <>
      <header>
        <nav className="navbar">
          <img src={logo} alt="RecettApp" className="logo" />
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/favoris">Recettes favorites</Link></li>
          </ul>
        </nav>
        <Link to="/formulaire" className="btn-ajouter">Ajouter une recette</Link>
        
{/* // Champ texte lié à la recherche, met à jour l'état "search" à chaque saisie */}
      <input
      type="text"
      value={search}
      placeholder="Recherche de la recette"
      onChange={(e) => setSearch(e.target.value)}
      className="input-recherche"
      />
      </header>

      <div className="List">
        {recipeLists.length > 0 ? (
          recipeLists.map((recipe) => (         // Si des recettes sont trouvées, on les affiche
            <div key={recipe._id} className="recipeList">
              <h2>{recipe.title}</h2>
              <img src={recipe.image} alt={recipe.title} width={150} />
              <p>Temps de préparation : {recipe.preparationTime} minutes</p>
              {/* Lien vers les détails de la recette */}
              <Link to={`/details/${recipe._id}`}>Voir les détails</Link>
            </div>
          ))
        ) : (
          search.length > 0 && <p>Aucune recette trouvée</p>   // Affiche ce message si aucune recette ne correspond à la recherche
        )}
      </div>
    </>
  );
};

export default Header;
