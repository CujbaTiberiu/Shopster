import Nav from "../auth/Nav";
import NoPayment from "./NoPayment";

export default async function Home() {
  return (
    <main className="bg-slate-800 h-full">
      <Nav />
      <NoPayment />
    </main>
  );
}
