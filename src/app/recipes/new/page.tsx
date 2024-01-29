import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import RecipeForm from "@/components/RecipeForm";

export default async function NewRecipePage() {
  const jwt = cookies().get("JWT-TOKEN")?.value;
  const title: string = "Add new recipe";

  if (!jwt) {
    redirect("/login");
  }
  //const recipe = await getRecipe(params.id);
  return (
    <>
      <Header title={title} />
      <RecipeForm />
      <Footer />
    </>
  );
}
