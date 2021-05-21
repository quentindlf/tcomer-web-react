import { useContext } from "react";
import { IngredientList, RecipeModelBase } from "../models/recipe.model";
import {
  Context as RecipeContext,
  RecipeContextType,
} from "../context/recipeContext";
import { RecipeFormModelRaw } from "../models/recipe-helpers.model";
import RecipeForm from "../components/RecipeForm";

const RecipeAdd = () => {
  const { addRecipe } = useContext(RecipeContext) as RecipeContextType;

  const submitForm = (recipeRaw: RecipeFormModelRaw) => {
    if (recipeRaw) {
      const ingredientsNew = recipeRaw.ingredients.reduce(
        (list: IngredientList[], ingredient) => {
          const { name, number, unit } = ingredient;
          const ingredientNew = {
            number,
            unit,
            ingredient: {
              name,
            },
          };
          return [...list, ingredientNew];
        },
        []
      );

      console.log(ingredientsNew);

      const recipeNew: RecipeModelBase = {
        ...recipeRaw,
        ingredients: ingredientsNew,
      };

      console.log(recipeNew);

      addRecipe(recipeNew);
    }
  };

  return <RecipeForm onSubmit={submitForm} />;
};

export default RecipeAdd;
