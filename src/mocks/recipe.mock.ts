import { IngredientModel, RecipeModel, StepModel } from "../models/recipe.model";

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

export const mockRecipe: RecipeModel = {
    _id: '001',
    title: "Steak Frites",
    description: "Un plat de fou",
    ingredients: [
        { ingredient: mockSteak, number: 200, unit: 'grammes' },
        { ingredient: mockIngredientPommedeterre, number: 4, unit: null }
    ],
    steps: [mockStep, mockStep],
    preparationLength: '20min'
};