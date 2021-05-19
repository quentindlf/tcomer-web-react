import React, { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {
  Context as RecipeContext,
  RecipeContextType,
} from "../context/recipeContext";
import { useParams } from "react-router";
import { RecipeModel } from "../models/recipe.model";

const RecipeDetails = () => {
  const { state, fetchRecipe } = useContext(RecipeContext) as RecipeContextType;
  const [recipe, setRecipe] = useState<RecipeModel | undefined>(undefined);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const recipe =
      state.find((recipe) => {
        return recipe._id === id;
      }) || undefined;

    if (!recipe) {
      fetchRecipe(id);
    } else {
      setRecipe(recipe);
    }
  }, [state]);

  return recipe ? (
    <>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>Temps de préparation : {recipe.preparationLength}</p>
      <div>
        Ingrédients :
        <ListGroup horizontal>
          {recipe.ingredients.map((ingredient) => (
            <ListGroup.Item key={ingredient._id}>
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
            <li key={step._id}>{step.description}</li>
          ))}
        </ol>
      </div>
    </>
  ) : (
    <p>No recipe found</p>
  );
};

export default RecipeDetails;
