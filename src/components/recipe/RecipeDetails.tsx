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
      <Header title={recipeDetails?.title} />
      {recipeDetails && (
        <>
          <Image
            src={recipeDetails.imgUrl}
            alt={recipeDetails.title}
            height={350}
            width={350}
            className="w-full h-40 object-cover"
          />
          <div className="w-11/12 mx-4 mt-2 mb-40">
            <section className="flex justify-start gap-12">
              <div className="text-gray-500 font-medium text-l">
                <p>Servings:</p>
                <p>Preperation time:</p>
                <p>Cooking time:</p>
              </div>
              <div className="font-medium text-l">
                <p>{recipeDetails.servings} servings</p>
                <p>{recipeDetails.prepTime} minutes</p>
                <p>{recipeDetails.cookTime} minutes</p>
              </div>
            </section>
            <section className="mt-2">
              <h2 className="text-lg text-selected font-bold">Ingredients</h2>
              {recipeDetails.recipeIngredients
                .sort((a, b) => b.amount - a.amount)
                .map((ingredient) => (
                  <div className="flex gap-2" key={ingredient.id}>
                    <p className="font-bold">{ingredient.amount}</p>
                    <p>{ingredient.unit.name}</p>
                    <p>{ingredient.ingredientName}</p>
                  </div>
                ))}
            </section>

            <section className="mt-4">
              <h2 className="text-lg text-selected font-bold">Step-by-step</h2>
              {recipeDetails.instructions
                .sort((a, b) => parseInt(a.step) - parseInt(b.step))
                .map((instruciton) => (
                  <div className="flex my-2">
                    <p className="font-bold">{instruciton.step}.</p>
                    <p>{instruciton.description}</p>
                  </div>
                ))}
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default RecipeDetails;
