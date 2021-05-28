import { UnitModel } from "./unit.model";

export interface RecipeFormModelRaw {
    title: string;
    description: string;
    preparationLength: string;
    ingredients: IngredientListModelTEMPRaw[];
    steps: { description: string }[];
}

export interface IngredientListModelTEMPInit {
    name: string;
    number: number;
    unit: UnitModel | undefined;
}

export interface IngredientListModelTEMPRaw {
    name: string;
    number: number;
    unit: UnitModel;
}