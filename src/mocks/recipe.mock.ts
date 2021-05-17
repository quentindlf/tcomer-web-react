export class RecipeModel {
    id?: string;
    title: string;
    description: string;
    ingredients: IngredientList[];
    steps: StepModel[];
    preparationLength: string;
    video?: string;
    // backlog : categorie 'voir aussi'

    constructor() {
        this.title = '';
        this.description = '';
        this.ingredients = [];
        this.steps = [];
        this.preparationLength = '';
    }
}

export interface IngredientList {
    ingredient: IngredientModel,
    number: number,
    // faire array unit
    unit: string | null
}

export interface IngredientModel {
    // Faire liste ingredients / ajouter un ingredient
    name: string,
    location?: string,
    price?: number
    brand?: string
    type?: string
    note?: string,
}

export interface StepModel {
    description: string,
    image?: string,
    optional?: boolean
}

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
    id: '001',
    title: "Steak Frites",
    description: "Un plat de fou",
    ingredients: [
        { ingredient: mockSteak, number: 200, unit: 'grammes' },
        { ingredient: mockIngredientPommedeterre, number: 4, unit: null }
    ],
    steps: [mockStep, mockStep],
    preparationLength: '20min'
};