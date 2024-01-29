import { recipes } from "@/services/testResponse";
import RecipeDetails from "@/components/recipe/RecipeDetails";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRecipeById } from "@/services/api";

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
    redirect("/login");
  }

  return (
    <>
      <div>
        <RecipeDetails params={params} />
      </div>
    </>
  );
}
