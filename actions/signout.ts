'use server'
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import { validateRequest } from "@/lib/validation/validaterequest";

export async function logout(params:any) {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  if(params==="ADMIN"){
    redirect('/admin')
  }else{
    redirect('/')
  }
}
