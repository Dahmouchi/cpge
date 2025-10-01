import { validateRequest } from "@/lib/validation/validaterequest";
import { LoginComponent } from "./_components/login/login";
import HomeAdmin from "./_components/home/home";
import roleOf from "@/lib/role";
import { redirect } from "next/navigation";
const AdminLandingPage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    return (
      <>
        <LoginComponent />
      </>
    );
  } else if ( await roleOf(user.role) === "admin") {
    return (
      <>
        <HomeAdmin user={user}/>    
      </>
    ) 
  } else {
    redirect('/')
  }
};

export default AdminLandingPage;
