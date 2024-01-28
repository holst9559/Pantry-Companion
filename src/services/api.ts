import { Ingredient, RegisterCredentials } from "@/utils/types";

export async function logIn(email: string, password: string) {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.replace("/home");
    }
  } catch (error) {
    throw new Error("Could not log in");
  }
}

export async function register(user: RegisterCredentials): Promise<Boolean> {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
    });

    if (res != null) {
      const payload = await res.json();
      return payload;
    } else {
      throw new Error("User registration failed");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to register");
  }
}

//Currently not working, problem with logic in Spring Boot
export async function getRecipesWithIngredients(ingredients: Ingredient[]) {
  const stringArray: String[] = ingredients.map(
    (ingredient) => ingredient.name
  );

  try {
    const res = await fetch("/api/recipes/search", {
      method: "POST",
      body: JSON.stringify(stringArray),
    });

    if (res != null) {
      const payload = await res.json();
      return payload;
    } else {
      throw new Error("Failed to fetch recipes with ingredients array");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to fetch recipesr");
  }
}

export async function getAllRecipes() {
  const res = await fetch("/api/recipes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);

  if (res != null) {
    const payload = await res.json();
    return payload;
  } else {
    throw new Error("Failed to fetch all recipes");
  }
}
