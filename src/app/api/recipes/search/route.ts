import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const token = cookies().get("JWT-TOKEN");
  const payload = await req.json();

  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/recipes/search?ingredients=${payload}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      const response = NextResponse.json(data);
      return response;
    } else {
      throw new Error("Recipe fetch failed");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to fetch recipes");
  }
}
