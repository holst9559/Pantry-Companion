"use client";
import { FC, useState } from "react";
import { Session, Recipe, Ingredient } from "@/utils/types";
import RecipeCard from "./RecipeCard";
import RecipeFilter from "./RecipeFilter";

type RecipeResultsProps = {
  ingredients: Ingredient[];
  session: Session;
  pantryIngredients: Ingredient[];
};

const RecipeResults: FC<RecipeResultsProps> = ({
  session,
  ingredients,
  pantryIngredients,
}) => {
  const [selectedIngredients, setSelectedIngredients] =
    useState<Ingredient[]>(ingredients);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/recipes", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setFilteredRecipes(data);
    } catch (error) {
      throw new Error("Could not fetch data");
    }
  };

  return (
    <div>
      <RecipeFilter
        ingredients={ingredients}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <section className="flex flex-col">
        <button
          className="justify-center mx-auto py-2 px-4 rounded-xl bg-selected text-white shadow-md shadow-gray-400"
          onClick={() => handleSubmit()}>
          Find recipes
        </button>
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
