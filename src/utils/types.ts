export type Session = {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    session: string;
  };
};

export type Recipe = {
  id: number;
  title: string;
  user: User;
  dish: Dish;
  category: Category;
  description: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  visible: boolean;
  instructions: Instruction[];
  recipeIngredients: RecipeIngredient[];
  imgUrl: string;
  diet: Diet;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  pictureUrl: string;
  recipes: Recipe[];
};

export type Dish = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Instruction = {
  id: number;
  recipe: Recipe;
  step: string;
  description: string;
};

export type RecipeIngredient = {
  id: number;
  recipes: Recipe[];
  ingredient: Ingredient;
  unit: Unit;
  amount: number;
};

export type Ingredient = {
  id: number;
  name: string;
};

export type IngredientObject = {
  id: number;
  name: string;
  state: string;
};

export type Unit = {
  id: number;
  name: string;
};

export type Diet = {
  id: number;
  name: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type IngredientDto = {
  amount: number;
  unit: string;
  ingredient: string;
};

export type InstructionDto = {
  step: string;
  description: string;
};
