import Image from "next/image";
import Nav from "./auth/Nav";
import prisma from "../prisma/prisma";
import Products from "../components/Products";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default async function Home() {
  // const userEmail = "cujba.tiberiu@gmail.com";
  // const user = await prisma.user.findUnique({
  //   where: { email: userEmail },
  // });

  // console.log(user);

  return (
    <main className="bg-slate-900">
      <Nav />
      <Hero />
      <Products />
      {/* {user?.roles.includes("ADMIN") ? <AddProduct /> : <h1>Hello</h1>} */}
      <Footer />
    </main>
  );
}
