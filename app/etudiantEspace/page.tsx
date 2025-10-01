import { validateRequest } from "@/lib/validation/validaterequest";
import  LoginComponent  from "@/app/etudiantEspace/_components/login/login";
import roleOf from "@/lib/role";
import Profile from "@/app/etudiantEspace/profile/page"
import { redirect } from "next/navigation";
const AdminLandingPage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    return (
      <>
        <LoginComponent />
      </>
    );
  } else if ( await roleOf(user.role) === "user") {
    return (
      <>
        <Profile user={user} />
      </>
    ) 
  } else {
    redirect('/')
  }
};

export default AdminLandingPage;
