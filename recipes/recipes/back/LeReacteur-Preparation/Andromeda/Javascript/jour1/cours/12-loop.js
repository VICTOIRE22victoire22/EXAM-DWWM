// console.log(1);
// console.log(2);
// console.log(3);
// console.log(4);
// console.log(5);

let value = 1;
const limit = 10;

// incrémentation : ajouter 1 à une valeur
// value = value + 1;
// ou
// value++;

// ajouter plus que 1 :
// value = value + 2;
// ou
// value += 2;

// retirer 1 :
// value--;
//  ou
// value = value - 1;
// ou :
// value -= 1;

while (value <= limit) {
  console.log(value);
  if (value === 5) {
    console.log("C'est mon chiffre préféré");
  }

  value += 2;
}

console.log("fin du code");
// pour stopper une boucle infinie, faites ctr + c
