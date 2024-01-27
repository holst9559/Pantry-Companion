"use client";
import { useState, FC, FormEvent, Dispatch, SetStateAction, use } from "react";
import { register } from "@/services/api";

interface RegisterModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const RegisterModal: FC<RegisterModalProps> = ({ setShowModal }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const handleUserRegister = async (
    ev: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    ev.preventDefault();
    try {
      await register({ email, password, firstName, lastName });

      setEmail("");
      setPassword("");
      setShowModal(false);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-container rounded-lg p-8 max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-6  ">Login</h2>
        <form onSubmit={handleUserRegister}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(ev: FormEvent<HTMLInputElement>) => {
                setEmail(ev.currentTarget.value);
              }}
              className="w-full px-4 py-2 bg-slate-200 rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(ev: FormEvent<HTMLInputElement>) => {
                setPassword(ev.currentTarget.value);
              }}
              className="w-full px-4 py-2 bg-slate-200 
              rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              value={firstName}
              onChange={(ev: FormEvent<HTMLInputElement>) => {
                setFirstName(ev.currentTarget.value);
              }}
              className="w-full px-4 py-2 bg-slate-200
              rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              value={lastName}
              onChange={(ev: FormEvent<HTMLInputElement>) => {
                setLastName(ev.currentTarget.value);
              }}
              className="w-full px-4 py-2 bg-slate-200
              rounded-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-selected text-white py-2 px-4 rounded-lg font-medium">
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => setShowModal(false)}
            className="bg-transparent border border-primary text-primary py-2 px-4 rounded-lg font-medium">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
