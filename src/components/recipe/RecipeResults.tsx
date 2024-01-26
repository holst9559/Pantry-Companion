"use client";
import { FC, useState } from "react";
import {
  Session,
  Recipe,
  User,
  Ingredient,
  RecipeIngredient,
  Instruction,
} from "@/utils/types";
import { SignOutButton } from "../SignOutButton";
import RecipeCard from "./RecipeCard";
import { recipes } from "@/services/testResponse";
import RecipeFilter from "./RecipeFilter";

type RecipeResultsProps = {
  ingredients: Ingredient[];
  session: Session;
};

const RecipeResults: FC<RecipeResultsProps> = ({ session, ingredients }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );

  return (
    <div>
      <RecipeFilter
        ingredients={ingredients}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <section>
        <ul className="flex gap-4 justify-center mt-2">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
          ))}
        </ul>
        <SignOutButton />
      </section>
    </div>
  );
};

export default RecipeResults;
