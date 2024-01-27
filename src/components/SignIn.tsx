"use client";
import { FC, useState } from "react";
import { FormEvent } from "react";
import { logIn } from "@/services/api";
import RegisterModal from "./RegisterModal";

const SignIn: FC = ({}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showModal, setShowModal] = useState<Boolean>(false);

  const handleSubmit = async (
    ev: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    ev.preventDefault();

    try {
      await logIn({ email, password });
    } catch (error) {}
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
};

export default SignIn;
