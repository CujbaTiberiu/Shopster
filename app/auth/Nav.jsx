import Link from "next/link";
import Login from "./Login";
import Logged from "./Logged";
import { getServerSession } from "next-auth";
import { outhOptions } from "@/pages/api/auth/[...nextauth]";
import Image from "next/image";
import { GrCart } from "react-icons/gr";

export default async function Nav() {
  const session = await getServerSession(outhOptions);
  console.log(session);
  return (
    <div className="flex justify-between items-center mx-2 text-white">
      <Link href={"/"}>Shopster</Link>
      <div>
        <Link href={"/cart"}>
          <GrCart className="inline-block text-gray-50 text-2xl mx-2" />
        </Link>
        {!session?.user && <Login />}
        {session?.user && <Logged session={session} />}
      </div>
    </div>
  );
}
