import axios from "axios";
import { LoginCredentials, RegisterCredentials } from "@/utils/types";

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

export async function getAllRecipes() {
  const res = await fetch("http://localhost:8080/api/v1/recipes", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  //const data = await res.json();

  console.log(res);
}
