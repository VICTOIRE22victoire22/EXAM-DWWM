// Voici un tableau nommé numbers contenant plusieurs éléments (des nombres et un tableau de nombres) :

// const numbers = [0, 1, 2, 3, 4, 5, 6, 7, "eight"];
// Copiez-collez le code ci-dessus dans votre fichier array-handling-v2.js.

// Dans cet exercice, vous devez assembler les éléments du tableau numbers afin d'obtenir la chaine de caractères suivante :

// 0-1-2-3-4-5-6-7
// Le dernier élément du tableau ne devra pas apparaitre dans le résultat final.

// Recommandations :
// avant de commencer, prenez le temps de déterminer des étapes qui vous permettront d'arriver au résultat attendu
// utilisez la méthode .join() pour assembler les éléments d'un tableau en une chaine de caractères
//utilisez des console.log() pour vérifier chacune de vos étapes

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, "eight"];

numbers.pop();

const string = numbers.join("-");

console.log(string);    // 0-1-2-3-4-5-6-7