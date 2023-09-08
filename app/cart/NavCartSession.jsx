import { getServerSession } from "next-auth";
import React from "react";
import { outhOptions } from "../../pages/api/auth/[...nextauth]";
import NavCart from "./NavCart";
import NavCartRedirect from "./NavCartRedirect";

const NavCartSession = async () => {
  const session = await getServerSession(outhOptions);

  return (
    <div className="flex justify-center items-center gap-1">
      {session?.user ? <NavCart /> : <NavCartRedirect />}
    </div>
  );
};

export default NavCartSession;
