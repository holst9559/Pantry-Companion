import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RecipesPage() {
  const jwt = cookies().get("JWT-TOKEN")?.value;

  if (!jwt) {
    redirect("/home");
  }
  //const recipe = await getRecipe(params.id);
  return (
    <>
      <div>RECIPES PAGE</div>
      <Footer />
    </>
  );
}
