"use client";
import { Recipe } from "@/utils/types";
import { FC, use, useEffect, useState } from "react";
import Header from "../Header";
import Image from "next/image";
import { getRecipeById } from "@/services/api";

type RecipeDetailsProp = {
  params: { id: number };
};

const RecipeDetails: FC<RecipeDetailsProp> = ({ params }) => {
  const [recipeDetails, setRecipeDetails] = useState<Recipe>();

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipeById(params.id.toString());
      setRecipeDetails(data);
      console.log(data);
      console.log(data.recipeIngredients);
    };
    fetchRecipe();
  }, []);

  return (
    <>
      <Header />
      {recipeDetails && (
        <>
          <Image
            src={recipeDetails.imgUrl}
            alt={recipeDetails.title}
            height={350}
            width={350}
            className="w-full h-40 absolute object-cover"
          />
          <section>
            <p>Portions: {recipeDetails.servings}</p>
            <p>Preperation time: {recipeDetails.prepTime} minutes</p>
            <p>Cooking time: {recipeDetails.cookTime} minutes</p>
          </section>
          <section>
            <h2>Ingredients</h2>
            {recipeDetails.recipeIngredients.map((ingredient) => (
              <div>
                <p>{ingredient.amount}</p>
                <p>{ingredient.unit.name}</p>
                <p>{ingredient.ingredientName}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>Step-by-step</h2>
            {recipeDetails.instructions.map((instruciton) => (
              <div>
                <p>{instruciton.step}</p>
                <p>{instruciton.description}</p>
              </div>
            ))}
          </section>
          <div></div>
        </>
      )}
    </>
  );
};

export default RecipeDetails;
