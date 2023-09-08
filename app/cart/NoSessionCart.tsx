import Link from "next/link";
import React from "react";
import { AiOutlineRollback } from "react-icons/ai";

const NoSessionCart = () => {
  return (
    <div className="text-white text-3xl bg-yellow-500 py-20 px-3 flex flex-col justify-center items-center h-screen">
      <h1>Sign in first!</h1>
      <h2>And then add some products.</h2>
      <Link
        href="/"
        className="px-3 py-2 bg-teal-600 mt-4 rounded-lg flex justify-center items-center gap-1"
      >
        <AiOutlineRollback /> Back to home
      </Link>
    </div>
  );
};

export default NoSessionCart;
