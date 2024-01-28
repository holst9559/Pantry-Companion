import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = cookies().get("JWT-TOKEN");

  if (!token) {
    throw new Error("JWT-TOKEN cookie not found");
  }
  try {
    const res = await fetch("http://localhost:8080/api/v1/recipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      throw new Error("Could not fetch data");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to fetch recipes");
  }
}

export async function POST(req: NextRequest) {
  const token = cookies().get("JWT-TOKEN");

  if (!token) {
    throw new Error("JWT-TOKEN cookie not found");
  }
  try {
    const res = await fetch("http://localhost:8080/api/v1/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(req),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      throw new Error("Could not create recipe");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to create a recipe");
  }
}
