import AddProduct from "../dashboard/AddProduct";
import DashNav from "../dashboard/DashNav";
import Footer from "../../components/Footer";
import { outhOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Unauthorized from "./Unauthorized";

export default async function Dashboard() {
  const session = await getServerSession(outhOptions);

  return (
    <main className="bg-white">
      {session?.user?.roles.includes("ADMIN") ? (
        <>
          <DashNav />
          <AddProduct />
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
