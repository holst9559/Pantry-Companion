import Header from "@/components/Header";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const jwt = cookies().get("JWT-TOKEN")?.value;

  if (jwt) {
    redirect("/home");
  } else if (!jwt) {
    redirect("/login");
  }
}
