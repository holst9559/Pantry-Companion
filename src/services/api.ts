import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { LoginCredentials, RegisterCredentials } from "@/utils/types";

export async function getAllRecipes() {
  const res = await fetch("http://localhost:8080/api/v1/recipes", {
    method: "GET",
  });
  console.log(res);
}

export async function logIn(user: LoginCredentials): Promise<Boolean> {
  try {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/jsoin",
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      return true;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to login");
  }
}

export async function register(user: RegisterCredentials): Promise<Boolean> {
  try {
    const res = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/jsoin",
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      return true;
    } else {
      throw new Error("User registration failed");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to register");
  }
}
