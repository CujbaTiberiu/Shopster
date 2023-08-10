"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button
      onClick={() => signIn("google")}
      className="text-sm px-4 py-2 bg-teal-900 rounded-lg mt-2"
    >
      {" "}
      Sign in{" "}
    </button>
  );
}
