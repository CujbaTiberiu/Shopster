"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";

export default function Logged({ session }) {
  return (
    <div className="flex items-center gap-4">
      {/* <h1>{session.user.name}</h1> */}
      <Image
        width={500}
        height={500}
        src={session.user.image}
        className="h-10 w-10 rounded-3xl"
        alt={session.user.name + "image"}
      ></Image>
      <button
        className="text-sm px-4 py-2 bg-teal-900 rounded-lg hover:-translate-y-1 ease-in-out duration-500"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}
