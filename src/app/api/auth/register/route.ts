import { RegisterCredentials } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await req.json();
  try {
    const res = await fetch("http://localhost:8080/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      const payload = await res.json();
      return NextResponse.json(payload);
    } else {
      throw new Error("User registration failed");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to register a new user");
  }
}
