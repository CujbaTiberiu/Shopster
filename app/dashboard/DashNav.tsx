import Link from "next/link";
import React from "react";
import { SiShopee } from "react-icons/si";

const DashNav = () => {
  return (
    <div className="flex justify-between items-center text-white bg-slate-600 w-full px-2 shadow-md shadow-teal-700 fixed z-10 py-3">
      <div className=" text-2xl">
        <Link href={"/"} className="flex justify-between items-center gap-1">
          Shopster
          <SiShopee className=" text-teal-700" />
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <Link href={"/dashboard"} className="text-white flex mx-2">
          Dashboard
        </Link>
        <Link href={"/dashboard/allProducts"} className="text-white flex mx-2">
          Products
        </Link>
        <Link href={"/orders"} className="text-white flex mx-2">
          Orders
        </Link>
      </div>
    </div>
  );
};

export default DashNav;
