"use client";
import Link from "next/link";
import React from "react";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const NavCart = () => {
  const products = useSelector((state: RootState) => state.cartSlice.items);
  return (
    <div className="hover:-translate-y-1 ease-in-out duration-500">
      <Link href={"/cart"} className="text-white flex mx-2">
        <LiaCartArrowDownSolid className="text-2xl" />
        <div>({products.length})</div>
      </Link>
    </div>
  );
};

export default NavCart;
