// Voici une variable nommée language :

// const language = "javascript";
// Copiez / collez le code ci-dessus dans votre fichier only-a.js.

// Vous devez afficher toutes les lettres de la chaîne de caractères dans le Terminal seulement s'il s'agit de la lettre a.
// Commencez par réaliser cet exercice en utilisant une boucle while. Réécrivez ensuite votre programme en utilisant cette fois-ci une boucle for.

// Utilisation d'une boucle while :

const language = "javascript";

let number = 0;

while (number <= language.length - 1) {
  if (language[number] === "a") {
    console.log(language[number]);
  }
  number++;
}
// Utilisation d'une boucle for :

const languages = "javascript";

for (let i = 0; i <= languages.length - 1; i++) {
  if (languages[i] === "a") {
    console.log(languages[i]);
  }
}