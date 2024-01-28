import Footer from "@/components/Footer";
import LogOutButton from "@/components/LogOutButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const jwt = cookies().get("JWT-TOKEN")?.value;

  if (!jwt) {
    redirect("/login");
  }
  //const recipe = await getRecipe(params.id);
  return (
    <>
      <LogOutButton />
      <Footer />
    </>
  );
}
