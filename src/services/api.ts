import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cookies } from "next/headers";
import axios from "axios";

export async function testApi(session) {
  if (session) {
    const request = session.token;
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    console.log(res);

    if (res.ok) {
      console.log(res);
      const jwtCookie = document.cookie
        .split(": ")
        .find((row) => row.startsWith("JWT-TOKEN="));

      cookies().set("JWT-TOKEN", jwtCookie);
      console.log("COOKIE");
      console.log(jwtCookie);
    }
  }
}

export async function testApiGet(session) {
  if (session) {
    console.log("GET");
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "GET",
    });

    console.log(res);
  }
}

export async function getAllRecipes() {
  const res = await fetch("http://localhost:8080/api/v1/recipes", {
    method: "GET",
  });
  console.log(res);
}
