import Image from "next/image";
import Nav from "./auth/Nav";
import prisma from "../prisma/prisma";
import ProductsPage from "@/components/ProductsPage";
import AddProduct from "@/components/AddProduct";

export default async function Home() {
  // const userEmail = "cujba.tiberiu@gmail.com";
  // const user = await prisma.user.findUnique({
  //   where: { email: userEmail },
  // });

  // console.log(user);

  return (
    <main className="bg-slate-800 h-screen w-screen">
      <Nav />
      <AddProduct />
      {/* {user?.roles.includes("ADMIN") ? <AddProduct /> : <h1>Hello</h1>} */}
    </main>
  );
}
