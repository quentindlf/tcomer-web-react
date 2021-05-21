import createDataContext from './createDataContext';
import recipeApi from '../api/recipeApi';
import { RecipeModel, RecipeModelBase } from '../models/recipe.model';

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
    add_recipe = 'add_recipe',
    delete_recipe = 'delete_recipe',
    edit_recipe = 'edit_recipe'
}

type RecipePayload = {
    [Types.fetch_recipes]: {
        recipes: RecipeModel[];
    };
    [Types.fetch_recipe]: {
        recipe: RecipeModel;
    };
    [Types.add_recipe]: {
        recipe: RecipeModel;
    };
    [Types.delete_recipe]: {
        id: string;
    };
    [Types.edit_recipe]: {
        recipe: RecipeModel;
    };
}

export type RecipeContextType = {
    state: RecipeModel[]
    fetchRecipes: () => void
    fetchRecipe: (id: string) => void
    addRecipe: (recipe: RecipeModelBase) => void
    deleteRecipe: (id: string) => void
    editRecipe: (recipe: RecipeModel) => void
}

type RecipeActions = ActionMap<RecipePayload>[keyof ActionMap<RecipePayload>];

const recipeReducer = (state: RecipeModel[], action: RecipeActions) => {
    switch (action.type) {
        case Types.fetch_recipes:
            return action.payload.recipes;
        case Types.fetch_recipe: {
            const index = state.findIndex(recipe => recipe._id === action.payload.recipe._id);
            if (index >= 0) {
                const newState = state.map(recipe => {
                    if (recipe._id === action.payload.recipe._id) {
                        return action.payload.recipe;
                    }
                    return recipe;
                })
                return newState;
            } else {
                const newState = [...state, action.payload.recipe];
                return newState;
            }
        }
        case Types.add_recipe:
            return [...state, action.payload.recipe]
        case Types.delete_recipe:
            const stateTemp = [...state].filter(recipe => recipe._id !== action.payload.id)
            return stateTemp;
        case Types.edit_recipe: {
            // Mettre dans une fonction
            const index = state.findIndex(recipe => recipe._id === action.payload.recipe._id);
            if (index >= 0) {
                const newState = state.map(recipe => {
                    if (recipe._id === action.payload.recipe._id) {
                        return action.payload.recipe;
                    }
                    return recipe;
                })
                return newState;
            } else {
                // Handle error si pas de ID ?
                return state
            }
        }
        default:
            return state;
    }
}

const fetchRecipes = (dispatch: any) => async () => {
    const response = await recipeApi.get("/recipes");
    dispatch({ type: Types.fetch_recipes, payload: { recipes: response.data } });
};

const fetchRecipe = (dispatch: any) => async (id: string) => {
    const response = await recipeApi.get("/recipe", { params: { id: id } });
    dispatch({ type: Types.fetch_recipe, payload: { recipe: response.data } });
};

const addRecipe = (dispatch: any) => async (recipe: RecipeModelBase) => {
    const response = await recipeApi.post("/recipe", recipe, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // add try catch
    dispatch({ type: Types.add_recipe, payload: { recipe: response.data } });
};

const deleteRecipe = (dispatch: any) => async (id: string) => {
    await recipeApi.delete(`/recipe/${id}`);
    // add try catch
    dispatch({ type: Types.delete_recipe, payload: { id: id } });
};

const editRecipe = (dispatch: any) => async (id: string) => {
    const response = await recipeApi.delete(`/recipe/${id}`);
    // add try catch
    dispatch({ type: Types.edit_recipe, payload: { recipe: response.data } });
};

export const { Provider, Context } = createDataContext(
    recipeReducer,
    {
        fetchRecipes, fetchRecipe, addRecipe, deleteRecipe, editRecipe
    },
    []
);