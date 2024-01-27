"use client";
import { FC, useState, useEffect, useCallback } from "react";
import { Session, Recipe, Ingredient } from "@/utils/types";
import { SignOutButton } from "../SignOutButton";
import RecipeCard from "./RecipeCard";
import { recipes } from "@/services/testResponse";
import RecipeFilter from "./RecipeFilter";
import useSWR from "swr";

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

  useEffect(() => {
    //Uncomment once api fetch works
    //const { recipes } = useSWR(`http://localhost:8080/api/v1/recipes/search?value=${}`, fetch);
    //setFilteredRecipes(recipes);
    //setSelectedIngredients(pantryIngredients);
  }, []);

  return (
    <div>
      <RecipeFilter
        ingredients={ingredients}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
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
