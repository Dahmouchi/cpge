import NavBar from "@/app/profEspace/_components/nav";
import { validateRequest } from "@/lib/validation/validaterequest";
  import 'react-toastify/dist/ReactToastify.css';
  
// Assuming you have a Header component
import Header from "@/app/admin/_components/header/page";
import LoginEtudiant from "./_components/login/login";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (!user || user.role !== "ENSEIGNANT") {
    return <LoginEtudiant />
  }
  return (
      <div className="flex h-screen">
      <NavBar user={user} className="w-64 h-full bg-gray-800" />
        <div className="flex flex-col flex-1">
        <Header user={user}  role={"Des Professeurs"}/>
        <div className="p-7 flex-1 bg-gray-100 overflow-auto">
          {children}
        </div>
      </div>

    </div>
    );
}
