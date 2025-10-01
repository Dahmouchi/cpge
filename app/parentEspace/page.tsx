import { validateRequest } from "@/lib/validation/validaterequest";
import  LoginComponent  from "@/app/parentEspace/_components/login/login";
import roleOf from "@/lib/role";
import Profile from "@/app/parentEspace/profile/page"
import { redirect } from "next/navigation";
const AdminLandingPage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    return (
      <>
        <LoginComponent />
      </>
    );
  } else if ( await roleOf(user.role) === "parent") {
    return (
      <>
        <Profile user={user} />
      </>
    ) 
  } else {
    redirect('/');
  }
};

export default AdminLandingPage;
