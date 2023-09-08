"use client";
import React from "react";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { signIn } from "next-auth/react";

const NavCartRedirect = () => {
  const products = useSelector((state: RootState) => state.cartSlice.items);
  return (
    <div
      className="hover:-translate-y-1 ease-in-out duration-500 cursor-pointer"
      onClick={() => signIn()}
    >
      <div className="text-white flex mx-2">
        <LiaCartArrowDownSolid className="text-2xl" />
        <div>({products.length})</div>
      </div>
    </div>
  );
};

export default NavCartRedirect;
