// Point d'entrée de l'application: crée et affiche le composant App dans l'élément HTML avec l'id 'root'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <App />
)

