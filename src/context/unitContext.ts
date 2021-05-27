import createDataContext from './createDataContext';
import recipeApi from '../api/recipeApi';
import { UnitModel, UnitModelBase } from '../models/unit.model';

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
    fetch_units = 'fetch_units',
    // fetch_recipe = 'fetch_recipe',
    add_unit = 'add_unit',
    // delete_recipe = 'delete_recipe',
    // edit_recipe = 'edit_recipe'
}

type RecipePayload = {
    [Types.fetch_units]: {
        units: UnitModel[];
    };
    // [Types.fetch_recipe]: {
    //     recipe: RecipeModel;
    // };
    [Types.add_unit]: {
        unit: UnitModelBase;
    };
    // [Types.delete_recipe]: {
    //     id: string;
    // };
    // [Types.edit_recipe]: {
    //     recipe: RecipeModel;
    // };
}

export type UnitContextType = {
    state: UnitModel[]
    fetchUnits: () => void
    // fetchRecipe: (id: string) => void
    addUnit: (unit: UnitModelBase) => void
    // deleteRecipe: (id: string) => void
    // editRecipe: (recipe: RecipeModel) => void
}

type RecipeActions = ActionMap<RecipePayload>[keyof ActionMap<RecipePayload>];

const unitReducer = (state: UnitModel[], action: RecipeActions) => {
    switch (action.type) {
        case Types.fetch_units:
            return action.payload.units;
        // case Types.fetch_recipe: {
        //     const index = state.findIndex(recipe => recipe._id === action.payload.recipe._id);
        //     if (index >= 0) {
        //         const newState = state.map(recipe => {
        //             if (recipe._id === action.payload.recipe._id) {
        //                 return action.payload.recipe;
        //             }
        //             return recipe;
        //         })
        //         return newState;
        //     } else {
        //         const newState = [...state, action.payload.recipe];
        //         return newState;
        //     }
        // }
        case Types.add_unit:
            return [...state, action.payload.unit]
        // case Types.delete_recipe:
        //     const stateTemp = [...state].filter(recipe => recipe._id !== action.payload.id)
        //     return stateTemp;
        // case Types.edit_recipe: {
        //     // Mettre dans une fonction
        //     const index = state.findIndex(recipe => recipe._id === action.payload.recipe._id);
        //     if (index >= 0) {
        //         const newState = state.map(recipe => {
        //             if (recipe._id === action.payload.recipe._id) {
        //                 return action.payload.recipe;
        //             }
        //             return recipe;
        //         })
        //         return newState;
        //     } else {
        //         // Handle error si pas de ID ?
        //         return state
        //     }
        // }
        default:
            return state;
    }
}

const fetchUnits = (dispatch: any) => async () => {
    const response = await recipeApi.get("/units");
    dispatch({ type: Types.fetch_units, payload: { units: response.data } });
};

const addUnit = (dispatch: any) => async (unit: UnitModelBase) => {
    const response = await recipeApi.post("/unit", unit, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // add try catch
    dispatch({ type: Types.add_unit, payload: { unit: response.data } });
};

// const deleteRecipe = (dispatch: any) => async (id: string) => {
//     await recipeApi.delete(`/recipe/${id}`);
//     // add try catch
//     dispatch({ type: Types.delete_recipe, payload: { id: id } });
// };

// const editRecipe = (dispatch: any) => async (recipe: RecipeModel) => {
//     const response = await recipeApi.put(`/recipe/${recipe._id}`, recipe);
//     // add try catch
//     dispatch({ type: Types.edit_recipe, payload: { recipe: response.data } });
// };

export const { Provider, Context } = createDataContext(
    unitReducer,
    {
        fetchUnits, addUnit
    },
    []
);