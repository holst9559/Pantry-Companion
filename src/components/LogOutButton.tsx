"use client";
import { FC } from "react";
const LogOutButton: FC = () => {
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.replace("/login");
    } catch (error) {
      throw new Error("Could not log out");
    }
  };

  return (
    <>
      <button
        className="my-2 mx-auto py-2 px-4 rounded-xl bg-selected text-white"
        onClick={() => handleLogout()}>
        Logout
      </button>
    </>
  );
};

export default LogOutButton;
