// Voici une variable nommée password :

// const password = "qwerty";
// Copiez-collez le code ci-dessus dans votre fichier check-password.js.

// Le but de cet exercice est de vérifier la longueur de la variable password.
// Seulement les mots de passe d'au moins 8 caractères sont acceptés :

// si la longueur est strictement inférieure à 8 caractères, on affichera : "The password is not OK"
// si la longueur est supérieure ou égale à 8, on affichera : "The password is OK"
// Recommandations :
// vous pouvez utiliser les instructions if et else if ou bien if et else
// utilisez la propriété .length pour connaitre la longueur d'une chaine de caractères
// vous pouvez stocker la longueur de la chaine de caractères dans une variable
// tester votre code avec d'autres valeurs pour la variable password :
// const password = "pass"
// et
// const password = "qwerty1234"

// Utilisation des instructions if et else :
const password = "qwerty";

const passwordLength = password.length;
console.log(passwordLength); // 6

if (passwordLength < 8) {
    // si la longueur est strictement inférieure à 8, on exécute le code qui suit
  console.log("The password is not OK");
} else {
    // dans tous les autres cas, on exécute le code qui suit
  console.log("The password is OK");
}

// affichera "The password is not OK"
// Utilisation des instructions if et else if :
const passwords = "qwerty1234";

const passwordLengths = passwords.length;
console.log(passwordLength); // 10

if (passwordLengths < 8) {
     // si la longueur est strictement inférieure à 8, on exécute le code qui suit
  console.log("The password is not OK");
} else if (passwordLengths >= 8) {
    // ou bien si la longueur est supérieures ou égale à 8, on exécute le code qui suit
  console.log("The password is OK");
}

// affichera "The password is OK"