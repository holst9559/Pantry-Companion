import { FC } from "react";
import { recipes } from "@/services/testResponse";
import RecipeDetails from "@/components/recipe/RecipeDetails";

type RecipeDetailsPageProps = {
  params: { id: number };
};

export default async function RecipeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  //const recipe = await getRecipe(params.id);
  return (
    <>
      <div>
        <RecipeDetails recipeDetails={recipes[0]} />
      </div>
    </>
  );
}
