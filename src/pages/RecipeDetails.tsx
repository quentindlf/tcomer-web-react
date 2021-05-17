import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { mockRecipe } from "../mocks/recipe.mock";

const RecipeDetails = () => {
  const recipe = mockRecipe;

  return (
    <>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>Temps de préparation : {recipe.preparationLength}</p>
      <div>
        Ingrédients :
        <ListGroup horizontal>
          {recipe.ingredients.map((ingredient) => (
            <ListGroup.Item>
              <div>
                <p>
                  {ingredient.number} {ingredient.unit}
                </p>
                <p>
                  {ingredient.ingredient.name}{" "}
                  {ingredient.ingredient.type
                    ? `- ${ingredient.ingredient.type}`
                    : null}
                </p>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div>
        Etapes :
        <ol>
          {recipe.steps.map((step) => (
            <li>{step.description}</li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default RecipeDetails;
