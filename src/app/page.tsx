import { cookies } from "next/headers";
import Header from "@/components/Header";
import RecipeResults from "@/components/recipe/RecipeResults";

import { getAllRecipes } from "@/services/api";

import { getServerSession } from "next-auth";
import { Ingredient } from "@/utils/types";
import Footer from "@/components/Footer";
import SignIn from "@/components/SignIn";

export default async function Home() {
  //const ingredients: Ingredient[] = await getIngredients();
  //if (session) {
  //const getTesting = await testApiGet(session);
  //console.log(recipes);
  //}
  const session: Boolean = false;

  const ingredients: Ingredient[] = [
    { id: 1, name: "Chicken Breast" },
    { id: 2, name: "Panko" },
    { id: 3, name: "Curry" },
    { id: 4, name: "Tofu" },
    { id: 5, name: "Beef" },
  ];

  return (
    <main className="bg-background">
      <Header />
      {!session && (
        <div>
          <SignIn />
        </div>
      )}

      {session && <RecipeResults session={session} ingredients={ingredients} />}
      <Footer />
    </main>
  );
}
