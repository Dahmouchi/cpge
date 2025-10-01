import { validateRequest } from "@/lib/validation/validaterequest";
import  LoginComponent  from "@/app/profEspace/_components/login/login";
import roleOf from "@/lib/role";
import Profile from "@/app/profEspace/profile/page"
import { redirect } from "next/navigation";
const AdminLandingPage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    return (
      <>
        <LoginComponent />
      </>
    );
  } else if ( await roleOf(user.role) === "guest") {
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
