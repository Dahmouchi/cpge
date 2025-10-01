'use client'
import { logout } from "@/actions/signout";
import {LogOut} from "lucide-react";
const LogoutButton = (params:any) => {
  return (
    <h2
      className={`flex gap-2 items-center
                    text-gray-200 font-medium text-sm
                    mb-1
                    p-2 cursor-pointer rounded-md
                    hover:text-primary hover:bg-red-100`}
            onClick={()=>logout(params.role)}>
              <LogOut />
              Déconnexion
            </h2>    
  );
};

export default LogoutButton;
