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
    Fetch_all = 'fetch_recipes',
}

type RecipePayload = {
    [Types.Fetch_all]: {
    };
}

export type RecipeContextType = {
    state: RecipeModel[]
    fetchRecipes: () => void
}

type RecipeActions = ActionMap<RecipePayload>[keyof ActionMap<RecipePayload>];

const recipeReducer = (state: RecipeModel[], action: RecipeActions) => {
    switch (action.type) {
        case Types.Fetch_all:
            return action.payload;
        default:
            return state;
    }
}

const fetchRecipes = (dispatch: any) => async () => {
    const response = await recipeApi.get("/recipes");
    dispatch({ type: 'fetch_recipes', payload: response.data });
};

export const { Provider, Context } = createDataContext(
    recipeReducer,
    {
        fetchRecipes,
    },
    []
);