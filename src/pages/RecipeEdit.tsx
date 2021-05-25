import { useContext, useEffect } from "react";
import {
  IngredientList,
  RecipeModel,
  RecipeModelBase,
} from "../models/recipe.model";
import {
  Context as RecipeContext,
  RecipeContextType,
} from "../context/recipeContext";
import { RecipeFormModelRaw } from "../models/recipe-helpers.model";
import RecipeForm from "../components/RecipeForm";
import { useParams } from "react-router";
import useFetchRecipe from "../hooks/useFetchRecipe";

const RecipeEdit = () => {
  const { editRecipe } = useContext(RecipeContext) as RecipeContextType;

  const { id } = useParams<{ id: string }>();

  const recipe = useFetchRecipe(id);

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

      const recipeNew: RecipeModel = {
        ...recipeRaw,
        _id: id,
        ingredients: ingredientsNew,
      };

      console.log(recipeNew);

      editRecipe(recipeNew);
    }
  };

  return recipe ? (
    <RecipeForm recipe={recipe} onSubmit={submitForm} />
  ) : (
    <p>Loading</p>
  );
};

export default RecipeEdit;
