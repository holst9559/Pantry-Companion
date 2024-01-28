import Header from "@/components/Header";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="bg-background">
      <Header />
      <div>
        <Link href="/login">Login</Link>
      </div>
    </main>
  );
}
