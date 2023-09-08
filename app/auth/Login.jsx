"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button
      onClick={() => signIn()}
      className="text-sm px-4 py-2 bg-teal-900 rounded-lg my-2 hover:-translate-y-1 ease-in-out duration-500"
    >
      {" "}
      Sign in{" "}
    </button>
  );
}
