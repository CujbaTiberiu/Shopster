import Nav from "../auth/Nav";
import Details from "./Details";

export default async function Home() {
  return (
    <main className="bg-white h-screen">
      <Nav />
      <Details />
    </main>
  );
}
