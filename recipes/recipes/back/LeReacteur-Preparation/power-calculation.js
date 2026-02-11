// Vous devez déclarer une fonction nommée powerCalculation qui reçoit deux arguments (deux nombres) et qui doit afficher le résultat d'un calcul de puissance.

// Voici l'appel de la fonction powerCalculation :

// powerCalculation(2, 3);
// Copiez / collez le code ci-dessus dans votre fichier power-calculation.js.

// Résultat attendu dans le Terminal :

// 8
// Vous devrez ensuite appeler la fonction powerCalculation en lui passant un nouveau tableau :

// powerCalculation(5, 5);
// Résultat attendu dans le Terminal :

// 3125

const powerCalculation = (number1, number2) => {
  const result = number1 ** number2;
  console.log(result);
};

powerCalculation(2, 3); // 8
powerCalculation(5, 5); // 3125