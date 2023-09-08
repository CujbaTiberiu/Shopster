import Cart from "./Cart";
import Nav from "../auth/Nav";
import { outhOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Footer from "../../components/Footer";
import NoSessionCart from "./NoSessionCart";

export default async function Home() {
  const session = await getServerSession(outhOptions);
  return (
    <main className="bg-slate-800 h-full">
      {session?.user ? (
        <>
          <Nav />
          <Cart />
        </>
      ) : (
        <>
          <NoSessionCart />
          <Footer />
        </>
      )}
    </main>
  );
}
