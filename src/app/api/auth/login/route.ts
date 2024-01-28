import { NextRequest, NextResponse } from "next/server";
import generateToken from "@/utils/token";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const response = new NextResponse();

    const res = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { token, userDto } = await res.json();
      const userSession = {
        id: userDto.id,
        name: userDto.firstName + " " + userDto.lastName,
        email: userDto.email,
      };
      const sessionJwt = generateToken(userSession);

      response.cookies.set({
        name: "JWT-TOKEN",
        value: token,
        httpOnly: true,
      });

      response.cookies.set({
        name: "u-session",
        value: sessionJwt,
      });

      return response;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to login");
  }
}
