import NavBar from "@/app/parentEspace/_components/nav";
import { validateRequest } from "@/lib/validation/validaterequest";
  import 'react-toastify/dist/ReactToastify.css';
  
// Assuming you have a Header component
import Header from "@/app/parentEspace/_components/header/page";
import LoginEtudiant from "./_components/login/login";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (!user || user.role !== "PARENT") {
    return <LoginEtudiant />
  }
    return (
      <div className="flex h-screen">
      <NavBar user={user} className="w-64 h-full bg-gray-800" />
        <div className="flex flex-col flex-1">
        <Header user={user}  role={"Des Parents"} />
        <div className="lg:p-7 p-2 flex-1 bg-gray-100 overflow-auto">
          {children}
        </div>
      </div>

    </div>
    );
  
}
