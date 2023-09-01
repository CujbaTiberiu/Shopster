import Image from "next/image";
import prisma from "../../prisma/prisma";
import AddProduct from "../dashboard/AddProduct";
import DashNav from "../dashboard/DashNav";
import Footer from "../../components/Footer";

export default async function Dashboard() {
  // const userEmail = "cujba.tiberiu@gmail.com";
  // const user = await prisma.user.findUnique({
  //   where: { email: userEmail },
  // });

  // console.log(user);

  return (
    <main className="bg-slate-900 h-screen w-screen">
      <DashNav />
      <AddProduct />
      {/* {user?.roles.includes("ADMIN") ? <AddProduct /> : <h1>Hello</h1>} */}
      <Footer />
    </main>
  );
}
