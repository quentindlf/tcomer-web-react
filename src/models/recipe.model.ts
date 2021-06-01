
import { UnitModel } from "./unit.model";

export interface RecipeModel extends RecipeModelBase {
    _id: string
}

export interface RecipeModelBase {
    // _id: string;
    title: string;
    description: string;
    ingredients: IngredientList[];
    steps: StepModel[];
    preparationLength: string;
    video?: string;
    links?: string[];
    //     // backlog : categorie 'voir aussi'
}

export interface IngredientList {
    _id?: string;
    ingredient: IngredientModel,
    number: number,
    // faire array unit
    unit: UnitModel
}

export interface IngredientModel {
    // Faire liste ingredients / ajouter un ingredient
    _id?: string;
    name: string,
    location?: string,
    price?: number
    brand?: string
    type?: string
    note?: string,
}

export interface StepModel {
    _id?: string;
    description: string,
    image?: string,
    optional?: boolean
}