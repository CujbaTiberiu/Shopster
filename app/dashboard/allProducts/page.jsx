import DashNav from "../DashNav";
import Products from "./Products";
import Footer from "../../../components/Footer";
import { outhOptions } from "../../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Unauthorized from "../Unauthorized";

export default async function Dashboard() {
  const session = await getServerSession(outhOptions);
  return (
    <main className="bg-slate-900">
      {session?.user?.roles.includes("ADMIN") ? (
        <>
          <DashNav />
          <Products />
          <Footer />
        </>
      ) : (
        <>
          <Unauthorized />
          <Footer />
        </>
      )}
    </main>
  );
}
