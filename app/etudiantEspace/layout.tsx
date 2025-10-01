import { Toaster } from "react-hot-toast";
import NavBar from "@/app/etudiantEspace/_components/nav";
import { validateRequest } from "@/lib/validation/validaterequest";
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/app/etudiantEspace/_components/header/page";
import { redirect } from "next/navigation"; // Import redirect utility from Next.js
import LoginEtudiant from "./_components/login/login";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  if (!user || user.role !== "ETUDIANT") {
    return <LoginEtudiant />
  }
  return (
    <div className="flex h-screen">
      <NavBar user={user} className="w-64 h-full bg-gray-800" />
      <div className="flex flex-col flex-1">
        <Header user={user} role={"Des Etudiants"} />
        <div className="p-2 lg:p-7 flex-1 bg-gray-100 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
