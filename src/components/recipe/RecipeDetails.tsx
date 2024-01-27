import { Recipe } from "@/utils/types";
import { FC } from "react";
import Header from "../Header";
import Image from "next/image";

type RecipeDetailsProp = {
  recipeDetails: Recipe;
};

const RecipeDetails: FC<RecipeDetailsProp> = async ({ recipeDetails }) => {
  return (
    <>
      <Header />
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
            <p>{ingredient.ingredient.name}</p>
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
  );
};

export default RecipeDetails;
