import Link from "next/link";
import React from "react";

const Succes = () => {
  return (
    <>
      <div className="text-white text-center text-3xl bg-red-300 py-2 px-3">
        Something went wrong...Please try again!
      </div>
      <Link href="/" className="px-3 py-2 bg-teal-600 text-center">
        Back to home
      </Link>
    </>
  );
};

export default Succes;
