import {
  Session,
  Recipe,
  User,
  Ingredient,
  RecipeIngredient,
  Instruction,
} from "@/utils/types";

export const recipes: Recipe[] = [];

const testUser: User = {
  id: 1,
  firstName: "Anton",
  lastName: "Holst",
  fullName: "Anton Holst",
  email: "anton@test.com",
  pictureUrl:
    "https://lh3.googleusercontent.com/a/ACg8ocLA8sYAIEjm7sNXHYh3PzHCN-pQGXKYZ2UYcNtY9-oNlA=s96-c",
  recipes: [],
};

const testRecipe: Recipe = {
  id: 1,
  title: "Fried Chicken",
  user: testUser,
  dish: {
    id: 1,
    name: "Main Course",
  },
  category: {
    id: 1,
    name: "Other",
  },
  description: "This is a good curry",
  prepTime: 20,
  cookTime: 30,
  totalTime: 50,
  servings: 4,
  visible: true,
  instructions: [],
  recipeIngredients: [],
  imgUrl:
    "https://plus.unsplash.com/premium_photo-1672846027109-e2c91500afef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  diet: {
    id: 1,
    name: "Omnivore",
  },
};

const testRecipe2: Recipe = {
  id: 2,
  title: "Curry",
  user: testUser,
  dish: {
    id: 1,
    name: "Main Course",
  },
  category: {
    id: 1,
    name: "Other",
  },
  description: "This is a good curry",
  prepTime: 20,
  cookTime: 30,
  totalTime: 50,
  servings: 4,
  visible: true,
  instructions: [],
  recipeIngredients: [],
  imgUrl:
    "https://plus.unsplash.com/premium_photo-1672846027109-e2c91500afef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  diet: {
    id: 1,
    name: "Omnivore",
  },
};

const testIngredient: Ingredient = {
  id: 1,
  name: "Chicken Breast",
};
const testIngredient2: Ingredient = {
  id: 2,
  name: "Panko",
};
const testIngredient3: Ingredient = {
  id: 3,
  name: "Curry",
};
const testIngredient4: Ingredient = {
  id: 4,
  name: "Tofu",
};

const testRecipeIngredient: RecipeIngredient = {
  id: 1,
  recipes: [],
  ingredient: testIngredient,
  unit: {
    id: 1,
    name: "gram",
  },
  amount: 200,
};

const testRecipeIngredient2: RecipeIngredient = {
  id: 2,
  recipes: [],
  ingredient: testIngredient2,
  unit: {
    id: 1,
    name: "gram",
  },
  amount: 20,
};

const testRecipeIngredient3: RecipeIngredient = {
  id: 3,
  recipes: [],
  ingredient: testIngredient3,
  unit: {
    id: 1,
    name: "gram",
  },
  amount: 30,
};

const testRecipeIngredient4: RecipeIngredient = {
  id: 4,
  recipes: [],
  ingredient: testIngredient4,
  unit: {
    id: 1,
    name: "gram",
  },
  amount: 150,
};

const testInstruction: Instruction = {
  id: 1,
  recipe: testRecipe,
  step: "1",
  description: "Prepare the food",
};

const testInstruction2: Instruction = {
  id: 2,
  recipe: testRecipe,
  step: "2",
  description: "Cook the food",
};

testUser.recipes.push(testRecipe);
testRecipeIngredient.recipes.push(testRecipe);
testRecipeIngredient2.recipes.push(testRecipe);
testRecipe.instructions.push(testInstruction, testInstruction2);
testRecipe.recipeIngredients.push(testRecipeIngredient, testRecipeIngredient2);
testRecipeIngredient3.recipes.push(testRecipe2);
testRecipeIngredient4.recipes.push(testRecipe2);
testRecipe2.recipeIngredients.push(
  testRecipeIngredient3,
  testRecipeIngredient4
);
recipes.push(testRecipe, testRecipe2);
