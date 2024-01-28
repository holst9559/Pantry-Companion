import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PantryPage() {
  const jwt = cookies().get("JWT-TOKEN")?.value;

  if (!jwt) {
    redirect("/home");
  }
  return (
    <>
      <div>PANTRY</div>
      <Footer />
    </>
  );
}
