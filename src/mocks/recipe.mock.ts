import { IngredientModel, RecipeModel, StepModel } from "../models/recipe.model";
import { UnitModel } from "../models/unit.model";

export const mockIngredientPommedeterre: IngredientModel = {
    name: 'pomme de terre',
    type: 'Russet'
}
export const mockSteak: IngredientModel = {
    name: 'viande haché'
}
export const mockStep: StepModel = {
    description: 'Couper les patates',
    optional: false
}

export const mockUnit: UnitModel =
    { _id: 'd5g4dsf4gsd5', name: 'Grammes', value: 'g', system: 'metric', type: 'mass' }

export const mockRecipe: RecipeModel = {
    _id: '001',
    title: "Steak Frites",
    description: "Un plat de fou",
    ingredients: [
        { ingredient: mockSteak, number: 200, unit: mockUnit },
        { ingredient: mockIngredientPommedeterre, number: 4, unit: mockUnit }
    ],
    steps: [mockStep, mockStep],
    preparationLength: '20min'
};