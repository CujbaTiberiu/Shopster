import Nav from "../auth/Nav";
import Succes from "./Succes";

export default async function Home() {
  return (
    <main className="bg-slate-800 h-full">
      <Nav />
      <Succes />
    </main>
  );
}
