import NavBar from "./_components/home/nav/nav";
import { validateRequest } from "@/lib/validation/validaterequest";

// Assuming you have a Header component
import Header from "./_components/header/page";
import 'react-toastify/dist/ReactToastify.css';
import { LoginComponent } from "./_components/login/login";
  
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  if (!user || user.role !== "ADMIN") {
    return <><LoginComponent/></>;
  } else {
    return (
      <div className="flex h-screen overflow-hidden">
        <div className="flex h-screen overflow-hidden">
          <NavBar user={user} />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={user} role={"d'Administration"} />
        <div className="p-7 flex-1 bg-gray-100 overflow-auto">
          {children}
        </div>
      </div>
    </div>
    );
  }
}
