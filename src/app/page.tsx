import Image from "next/image";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  const loggedIn = cookies().get("JWT-TOKEN")?.value ? true : false;

  return (
    <main className="">
      <Header />

      {!loggedIn && (
        <section className="h-fit w-full flex flex-col p-4 backdrop-blur-md">
          <h2 className="font-semibold text-xl mx-auto">
            Welcome to Pantry Companion!
          </h2>
          <p className="mt-10 text-xl mx-auto">
            Sign in with your google account
          </p>
          <Link
            href="/api/v1/auth/login"
            className="text-white w-3/4 bg-primary hover:bg-primary/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mx-auto mb-2 mt-10">
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512">
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Login in with Google<div></div>
          </Link>
        </section>
      )}
    </main>
  );
}
