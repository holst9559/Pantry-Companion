"use client";
import { FC, useState, useEffect, use } from "react";
import { Recipe, Ingredient } from "@/utils/types";
import RecipeCard from "./RecipeCard";
import RecipeFilter from "./RecipeFilter";
import { getAllRecipes, getRecipesWithIngredients } from "@/services/api";
import { recipes } from "@/services/testResponse";

type RecipeResultsProps = {
  ingredients: Ingredient[];
  pantryIngredients: Ingredient[];
};

const RecipeResults: FC<RecipeResultsProps> = ({ ingredients }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>();
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

  const filterRecipesByIngredients = (
    recipes: Recipe[],
    ingredients: Ingredient[]
  ): Recipe[] => {
    return recipes.filter((recipe) =>
      recipe.recipeIngredients.every((recipeIngredient) =>
        ingredients.some(
          (ingredient) => ingredient.id === recipeIngredient.ingredient.id
        )
      )
    );
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getAllRecipes();
      setAllRecipes(data);
      setFilteredRecipes(data);
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const filterTest = filterRecipesByIngredients(
      allRecipes,
      selectedIngredients
    );
    setFilteredRecipes(filterTest);
  }, [selectedIngredients]);

  return (
    <div>
      <RecipeFilter
        ingredients={ingredients}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <section className="flex flex-col">
        <ul className="flex flex-row gap-4 justify-center mt-4">
          {filteredRecipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RecipeResults;
