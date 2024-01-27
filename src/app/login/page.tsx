"use client";
import { FC, use, useState } from "react";
import { FormEvent } from "react";
import { logIn } from "@/services/api";
import RegisterModal from "@/components/RegisterModal";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showModal, setShowModal] = useState<Boolean>(false);
  const router = useRouter();

  const handleSubmit = async (
    ev: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    ev.preventDefault();

    try {
      const data = await logIn({ email, password });
      console.log(data);

      router.push("/homepage");
    } catch (error) {
      throw new Error("Could not log in");
    }
  };

  return (
    <>
      <section className="bg-container shadow-xl h-fill mx-4 rounded-lg">
        <form className="flex flex-col p-2" onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            className="w-full px-4 py-2 bg-slate-200
            rounded-lg focus:outline-none"
            type="text"
            value={email}
            onChange={(ev: FormEvent<HTMLInputElement>) => {
              setEmail(ev.currentTarget.value);
            }}></input>
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            className="w-full px-4 py-2 bg-slate-200
            rounded-lg focus:outline-none"
            value={password}
            onChange={(ev: FormEvent<HTMLInputElement>) => {
              setPassword(ev.currentTarget.value);
            }}></input>
          <button
            className="my-4 mx-auto py-2 px-4 rounded-xl bg-selected text-white"
            type="submit">
            Login
          </button>
        </form>
      </section>

      <section className="flex flex-col bg-container shadow-xl h-fill mx-4 my-8 rounded-lg">
        <h2 className="block text-gray-700 font-medium text-center mt-2 text-lg">
          Not registered?
        </h2>
        <button
          className="my-4 mx-auto py-2 px-4 rounded-xl bg-selected text-white"
          onClick={() => setShowModal(true)}>
          Register
        </button>
        {showModal && <RegisterModal setShowModal={setShowModal} />}
      </section>
    </>
  );
}
