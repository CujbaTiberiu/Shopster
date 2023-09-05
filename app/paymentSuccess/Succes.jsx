import Link from "next/link";
import React from "react";
import { AiOutlineRollback } from "react-icons/ai";

const Succes = () => {
  return (
    <div className="text-white text-center text-3xl  bg-green-400 py-20 px-3  flex flex-col justify-center items-center">
      Your payment was successful! Thank you for choosing us!
      <Link
        href="/"
        className="px-3 py-2 bg-teal-600 mt-4 rounded-lg flex justify-center items-center gap-1"
      >
        <AiOutlineRollback /> Back to home
      </Link>
    </div>
  );
};

export default Succes;
