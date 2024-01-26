import { cookies } from "next/headers";
import Header from "@/components/Header";
import RecipeResults from "@/components/recipe/RecipeResults";

import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { getAllRecipes, testApi, testApiGet } from "@/services/api";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import RecipeFilter from "@/components/recipe/RecipeFilter";
import { Ingredient } from "@/utils/types";

export default async function Home() {
  const session = await getServerSession(authOptions);
  //const ingredients: Ingredient[] = await getIngredients();
  if (session) {
    const testing = await testApi(session);
    //const getTesting = await testApiGet(session);

    //console.log(recipes);
  }

  const ingredients: Ingredient[] = [
    { id: 1, name: "Flour" },
    { id: 2, name: "Eggs" },
    { id: 3, name: "Chicken" },
  ];

  return (
    <main className="bg-background">
      <Header />
      {!session && (
        <div>
          <GoogleSignInButton />
        </div>
      )}

      {session && <RecipeResults session={session} ingredients={ingredients} />}
    </main>
  );
}
