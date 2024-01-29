"use client";
import { FC, useState, useEffect } from "react";
import { Recipe, Ingredient } from "@/utils/types";
import RecipeCard from "./RecipeCard";
import RecipeFilter from "./RecipeFilter";
import { getAllIngredients, getAllRecipes } from "@/services/api";

type RecipeResultsProps = {
  ingredients: Ingredient[];
};

const RecipeResults: FC<RecipeResultsProps> = ({ ingredients }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>();
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);

  const filterRecipesByIngredients = (
    recipes: Recipe[],
    ingredients: Ingredient[]
  ): Recipe[] => {
    return recipes.filter((recipe) =>
      recipe.recipeIngredients.every((recipeIngredient) =>
        ingredients.some(
          (ingredient) => ingredient.name === recipeIngredient.ingredientName
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

    const fetchIngredients = async () => {
      const data = await getAllIngredients();
      setAllIngredients(data);
    };
    fetchRecipes();
    fetchIngredients();
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
        ingredients={allIngredients}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <section className="flex flex-col">
        <ul className="flex flex-row flex-wrap gap-4 justify-center mt-4">
          {filteredRecipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RecipeResults;
