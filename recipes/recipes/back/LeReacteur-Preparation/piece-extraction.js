// Voici une variable nommée string dont la valeur est la chaine de caractères "week-end" :

// const string = "week-end";
// Copiez / collez le code ci-dessus dans votre fichier piece-extraction.js.

// Vous devez ensuite créer une variable nommée piece dont la valeur sera les 3 dernières lettres de string. Affichez ensuite la valeur de piece dans le Terminal.

const string = "week-end";
const piece = string.slice(5, 8);
console.log(piece);    // end