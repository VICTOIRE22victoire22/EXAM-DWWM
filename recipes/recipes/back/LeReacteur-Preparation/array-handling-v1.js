// Voici une variable nommée colors dont la valeur est un tableau :

// const colors = ["grey", "purple", "yellow", "orange", "red", "blue"];
// Copiez / collez le code ci-dessus dans votre fichier array-handling-v1.js.

// Vous devez faire toutes les modifications nécessaires afin d'obtenir le tableau suivant :

// [ 'pink', 'purple', 'yellow', 'orange', 'red', 'black' ]
// Recommandations :
// avant de commencer, prenez le temps de déterminer des étapes qui vous permettront d'arriver au résultat attendu
// il n'est pas nécessaire de déclarer de nouvelles variables ; vous pouvez modifiez la variable colors directement
// utilisez les méthodes .unshift(), .pop(), .push() et .shift()

const colors = ["grey", "purple", "yellow", "orange", "red", "blue"];

colors.shift();
colors.pop();
colors.unshift("pink");
colors.push("black");

console.log(colors);    // [ 'pink', 'purple', 'yellow', 'orange', 'red', 'black' ]