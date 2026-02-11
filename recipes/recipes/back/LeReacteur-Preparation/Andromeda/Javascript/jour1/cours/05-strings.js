// CONCATENATION :

const message = "Hello";

const space = " ";

const firstName = "Farid";

// des strings peuvent etre concaténer entre elles, c'est à dire que l'on peut les assembler :

console.log(message + firstName); // affiche Hello Farid

console.log(firstName + " \n est un teacher incroyable");

// vous pouvez échapper un caractère (par exemple une apostrophe), en mettant un \ (antislash) devant !

// INTERPOLATION :

const CEO = "Xavier";

const company = "Reacteur";

console.log(`The ${company}'s boss lead is ${CEO}`);
