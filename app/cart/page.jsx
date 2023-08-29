import Cart from "./Cart";
import Nav from "../auth/Nav";

export default async function Home() {
  return (
    <main className="bg-slate-800 h-screen w-full">
      <Nav />
      <Cart />
    </main>
  );
}
