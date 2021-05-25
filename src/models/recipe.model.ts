// export class RecipeModelBase {
//     // _id: string;
//     title: string;
//     description: string;
//     ingredients: IngredientList[];
//     steps: StepModel[];
//     preparationLength: string;
//     video?: string;
//     // backlog : categorie 'voir aussi'

//     constructor(title = '', description = '', preparationLength = '', ingredients: IngredientList[] = [], steps: StepModel[] = []) {
//         this.title = title;
//         this.description = description;
//         this.ingredients = ingredients;
//         this.steps = steps;
//         this.preparationLength = preparationLength;
//     }

// }

// export class RecipeModel extends RecipeModelBase {
//     _id: string

//     constructor(_id: string) {
//         super();
//         this._id = _id;
//     }
// }

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
    //     // backlog : categorie 'voir aussi'
}

export interface IngredientList {
    _id?: string;
    ingredient: IngredientModel,
    number: number,
    // faire array unit
    unit: string
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