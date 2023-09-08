import Link from "next/link";
import Login from "./Login";
import Logged from "./Logged";
import { getServerSession } from "next-auth";
import { outhOptions } from "../../pages/api/auth/[...nextauth]";
import NavCartSession from "../cart/NavCartSession";
import { SiShopee } from "react-icons/si";

export default async function Nav() {
  const session = await getServerSession(outhOptions);
  console.log(session);
  return (
    <div className="flex justify-between items-center text-white bg-slate-600 w-full px-2 shadow-md shadow-teal-700 fixed z-10">
      <div className=" text-2xl">
        <Link href={"/"} className="flex justify-between items-center gap-1">
          Shopster
          <SiShopee className=" text-teal-700" />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-1">
        <NavCartSession />
        {session?.user.roles.includes("ADMIN") && (
          <Link
            href={"/dashboard"}
            className="text-sm px-4 py-2 bg-teal-900 rounded-lg my-2 hover:-translate-y-1 ease-in-out duration-500"
          >
            Dashboard
          </Link>
        )}
        {!session?.user && <Login />}
        {session?.user && <Logged session={session} />}
      </div>
    </div>
  );
}
