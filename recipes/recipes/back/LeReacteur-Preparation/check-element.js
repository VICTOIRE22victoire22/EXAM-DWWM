//Voici une variable nommée array :

//const array = [10, 20, 30, 40, 50, 60];
//Copiez-collez le code ci-dessus dans votre fichier check-element.js.

//Le but de cet exercice est de vérifier la présence d'un élément dans le tableau array.

//Vous devrez vérifier la présence des éléments suivants : 20 et 70.

//Si l'élément recherché est présent dans le tableau, on affichera :
//The element to check is in the array
//Si l'élément recherché n'est pas présent dans le tableau, on affichera :
//The element to check is NOT in the array
//Recommandation :
//utilisez la méthode .indexOf() qui permet de savoir si un élément est présent ou non dans un tableau

const array = [10, 20, 30, 40, 50, 60];

if (array.indexOf(70) !== -1) {
  console.log("The element to check is in the array");
} else {
  console.log("The element to check is NOT in the array");    // The element to check is NOT in the array
}