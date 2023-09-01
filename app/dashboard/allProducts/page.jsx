import DashNav from "../DashNav";
import Products from "./Products";
import Footer from "../../../components/Footer";

export default async function Dashboard() {
  return (
    <main className="bg-slate-900 h-full w-screen">
      <DashNav />
      <Products />
      <Footer />
    </main>
  );
}
