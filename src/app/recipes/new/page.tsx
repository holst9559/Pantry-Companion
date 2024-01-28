import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewRecipePage() {
  const jwt = cookies().get("JWT-TOKEN")?.value;

  if (!jwt) {
    redirect("/login");
  }
  //const recipe = await getRecipe(params.id);
  return (
    <>
      <div>NEW RECIPE</div>
      <Footer />
    </>
  );
}
