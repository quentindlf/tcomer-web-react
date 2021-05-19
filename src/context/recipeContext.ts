import createDataContext from './createDataContext';
import recipeApi from '../api/recipeApi';
import { RecipeModel } from '../models/recipe.model';

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    }
};

enum Types {
    fetch_recipes = 'fetch_recipes',
    fetch_recipe = 'fetch_recipe',
}

type RecipePayload = {
    [Types.fetch_recipes]: {
        recipes: RecipeModel[];
    };
    [Types.fetch_recipe]: {
        recipe: RecipeModel;
    };
}

export type RecipeContextType = {
    state: RecipeModel[]
    fetchRecipes: () => void
    fetchRecipe: (id: string) => void
}

type RecipeActions = ActionMap<RecipePayload>[keyof ActionMap<RecipePayload>];

const recipeReducer = (state: RecipeModel[], action: RecipeActions) => {
    switch (action.type) {
        case Types.fetch_recipes:
            return action.payload.recipes;
        case Types.fetch_recipe:
            const index = state.findIndex(recipe => recipe._id === action.payload.recipe._id);
            console.log(index)
            if (index >= 0) {
                const newState = state.map(recipe => {
                    if (recipe._id === action.payload.recipe._id) {
                        return action.payload.recipe;
                    }
                    return recipe;
                })
                console.log(newState);
                return newState;
            } else {
                const newState = [...state, action.payload.recipe];
                console.log(newState);
                return newState;
            }
        default:
            return state;
    }
}

const fetchRecipes = (dispatch: any) => async () => {
    const response = await recipeApi.get("/recipes");
    dispatch({ type: 'fetch_recipes', payload: { recipes: response.data } });
};

const fetchRecipe = (dispatch: any) => async (id: string) => {
    const response = await recipeApi.get("/recipe", { params: { id: id } });
    dispatch({ type: 'fetch_recipe', payload: { recipe: response.data } });
};

export const { Provider, Context } = createDataContext(
    recipeReducer,
    {
        fetchRecipes, fetchRecipe
    },
    []
);