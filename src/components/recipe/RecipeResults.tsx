"use client";
import { FC, useState, useEffect, useCallback } from "react";
import { Session, Recipe, Ingredient } from "@/utils/types";
import { SignOutButton } from "../SignOutButton";
import RecipeCard from "./RecipeCard";
import { recipes } from "@/services/testResponse";
import RecipeFilter from "./RecipeFilter";
import useSWR from "swr";
import { getAllRecipes } from "@/services/api";

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
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>();

  const handleSubmit = async () => {
    const payload = await getAllRecipes();
    console.log(payload);
  };

  return (
    <div>
      <RecipeFilter
        ingredients={ingredients}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <button
        className="my-4 mx-auto py-2 px-4 rounded-xl bg-selected text-white"
        onClick={() => handleSubmit()}>
        Find recipes
      </button>
      <section>
        <ul className="flex gap-4 justify-center mt-2">
          {filteredRecipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RecipeResults;
