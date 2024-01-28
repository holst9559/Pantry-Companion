import { recipes } from "@/services/testResponse";
import RecipeDetails from "@/components/recipe/RecipeDetails";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type RecipeDetailsPageProps = {
  params: { id: number };
};

export default async function RecipeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const jwt = cookies().get("JWT-TOKEN")?.value;

  if (!jwt) {
    redirect("/home");
  }
  return (
    <>
      <div>
        <RecipeDetails recipeDetails={recipes[0]} />
      </div>
    </>
  );
}
