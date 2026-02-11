// Voici une variable nommée name dont la valeur est la chaine de caractères "reacteur" :

// const name = "reacteur";
// Copiez / collez le code ci-dessus dans votre fichier string-handling.js.

// Vous devez ensuite créer une variable nommée newName dont la valeur sera la même que celle de name mais avec la première lettre en majuscule. 
// Dans cet exercice, créez autant de variables que nécessaire afin de stocker différentes valeurs. Enfin, affichez la valeur de newName dans le Terminal.

const name = "reacteur";

// étape 1 : extraire la 1ère lettre de name
const firstLetter = name[0];
console.log(firstLetter); // r

// étape 2 : transformer la 1ère lettre en majuscule
const firstLetterToUpperCase = firstLetter.toUpperCase();
console.log(firstLetterToUpperCase);    // R

// étape 3 : extraire le reste de la chaine de caractères
const otherLetters = name.slice(1);
console.log(otherLetters);    // eacteur

// étape 4 : assembler
const newName = firstLetterToUpperCase + otherLetters;
console.log(newName);    // Reacteur