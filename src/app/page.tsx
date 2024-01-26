import { cookies } from "next/headers";
import Header from "@/components/Header";
import RecipeResults from "@/components/RecipeResults";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { getAllRecipes, testApi, testApiGet } from "@/services/api";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  //console.log("MAIN");
  console.log(session.token);

  console.log(cookies().get("JSESSIONID"));

  if (session) {
    const testing = await testApi(session);
    //const getTesting = await testApiGet(session);

    //console.log(recipes);
  }

  return (
    <main className="">
      <Header />
      {!session && (
        <div>
          <GoogleSignInButton />
        </div>
      )}

      {session && <RecipeResults session={session} />}
    </main>
  );
}
