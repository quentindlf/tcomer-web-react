export interface RecipeFormModelRaw {
    title: string;
    description: string;
    preparationLength: string;
    ingredients: IngredientListModelTEMP[];
    steps: { description: string }[];
}

export interface IngredientListModelTEMP {
    name: string;
    number: number;
    unit: string | null;
}