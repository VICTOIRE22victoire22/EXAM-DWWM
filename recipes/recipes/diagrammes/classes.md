# Diagrammes de classes

Représentation des classes de l'application Recipes.

```mermaid

classDiagram

class Recipe {
    -String title
    -String image
    -String[] ingredients
    -String[] steps
    -Number preparationTime
    -Number servings
    -String[] tips
    -Category category
    -TypeOfCuisine typeOfCuisine
}

class Category {
    -String name
}

class TypeOfCuisine {
    -String name
}

Category "1" --> "0..*" Recipe : concerne
TypeOfCuisine "1" --> "0..*" Recipe : concerne

```