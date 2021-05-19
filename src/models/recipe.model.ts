export class RecipeModel {
    _id?: string;
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
    _id?: string;
    ingredient: IngredientModel,
    number: number,
    // faire array unit
    unit: string | null
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