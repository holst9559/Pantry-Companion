import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const jwt = cookies().get("u-session")?.value;

  const response = new NextResponse();

  if (!jwt) {
    return NextResponse.json({ error: "No user was found", status: 404 });
  }

  response.cookies.delete("u-session");
  response.cookies.delete("JWT-TOKEN");

  return response;
}
