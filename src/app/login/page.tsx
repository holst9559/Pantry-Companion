import LoginForm from "@/components/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const jwt = cookies().get("JWT-TOKEN")?.value;

  if (jwt) {
    redirect("/home");
  }

  return (
    <>
      <LoginForm />
    </>
  );
}
