import { cookies } from "next/headers";
import Header from "@/components/Header";
import RecipeResults from "@/components/recipe/RecipeResults";
import { useState } from "react";
import { getAllRecipes } from "@/services/api";

import { getServerSession } from "next-auth";
import { Ingredient } from "@/utils/types";
import Footer from "@/components/Footer";
import SignIn from "@/components/SignIn";
import { logIn } from "@/services/api";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="bg-background">
      <Header />
      <div>
        <Link href="/login">Login</Link>
      </div>
    </main>
  );
}
