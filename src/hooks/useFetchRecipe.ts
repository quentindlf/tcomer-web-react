import { useContext, useEffect, useState } from "react";
import { RecipeModel } from "../models/recipe.model";
import {
    Context as RecipeContext,
    RecipeContextType,
} from "../context/recipeContext";

export const useFetchRecipe = (id: string) => {

    const { state, fetchRecipe } = useContext(
        RecipeContext
    ) as RecipeContextType;

    const [recipe, setRecipe] = useState<RecipeModel | undefined>(undefined);

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
    }, [id, state]);

    return recipe;

}

export default useFetchRecipe;