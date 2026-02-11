// Voici une variable nommée language :

// const language = "javascript";
// Copiez / collez le code ci-dessus dans votre fichier capital-letters.js.

// Vous devez afficher toutes les lettres de la chaîne de caractères en majuscules dans le Terminal.
// Commencez par réaliser cet exercice en utilisant une boucle while. Réécrivez ensuite votre programme en utilisant cette fois-ci une boucle for.

// Utilisation d'une boucle while :

const language = "javascript";

let number = 0;

while (number <= language.length - 1) {
  console.log(language[number].toUpperCase());
  number++;
}
// Utilisation d'une boucle for :

const languages = "javascript";

for (let i = 0; i <= languages.length - 1; i++) {
  console.log(languages[i].toUpperCase());
}