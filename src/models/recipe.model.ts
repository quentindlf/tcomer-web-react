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