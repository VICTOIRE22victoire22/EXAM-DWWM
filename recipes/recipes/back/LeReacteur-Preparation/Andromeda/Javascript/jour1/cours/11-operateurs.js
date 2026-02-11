const password = "123456789";

// il existe deux operateurs de comparaisons :

// && : AINSI QUE

// || : OU BIEN

// on veut un password de 6 ou 7 caractères
if (password.length < 6 || password.length > 7) {
  console.log("password HORRIBLE");
} else {
  console.log("password OK");
}

if (password.length >= 6 && password.length <= 7) {
  console.log("password OK");
} else {
  console.log("password HORRIBLE");
}
