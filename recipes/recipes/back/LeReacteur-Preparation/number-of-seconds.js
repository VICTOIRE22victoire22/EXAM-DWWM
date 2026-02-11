// Dans cet exercice, nous allons rechercher combien il y a de secondes dans 3 heures.

// Déclarez une variable nommée hours dont la valeur sera le nombre d'heures, soit 3
// Déclarez une variable nommée total. La valeur de cette variable sera le nombre de secondes recherché.
// Déclarez d'autres variables (à vous de les nommer) afin de stocker différentes informations (nombre de minutes dans une heure, nombre de secondes dans une minute)
// Affichez la valeur de la variable total dans le terminal

// Méthode 1 : sans variables intermédiaires
const numberOfHours = 3;

let totalSeconds = 0;

totalSeconds = numberOfHours * 60 * 60;

console.log(totalSeconds);    // 10800

// Méthode 2 : avec des variables intermédiaires
const numberOfHourss = 3;

let totalSecondss = 0;

const secondsInOneMinutes = 60;
const minutesInOneHours = 60;

totalSecondss = numberOfHourss * secondsInOneMinutes * minutesInOneHours;

console.log(totalSecondss);    // 10800
