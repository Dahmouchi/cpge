"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BookUser, CalendarCheck2, EyeOff, MessageSquare ,BookOpenCheck} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/app/admin/_components/buttons/logout";

const menuListEtud  = (userId:any) => [
    {
      id: 1,
      name: "Profile",
      icon: BookUser,
      path: `/parentEspace`, 
    },
    {
      id: 2,
      name: "Emploi",
      icon: CalendarCheck2,
      path: `/parentEspace/emploi/${userId}`, // Include user ID in the path
    },
    {
      id: 3,
      name: "Absence",
      icon: EyeOff,
      path: "/parentEspace/absence",
      
    },
    {
      id: 4,
      name: "Remarques",
      icon: MessageSquare,
      path: "/parentEspace/remarque",
     
    },
    {
      id: 5,
      name: "Notes",
      icon: BookOpenCheck,
      path: "/parentEspace/notes",
    },
  ];

function NavBar(params: any) {
  const user = params.user;
  const path = usePathname();
  const selectedMenu = menuListEtud(user.id);

  return (
    <div className="h-screen p-5 border shadow-sm bg-slate-800 w-64 hidden lg:block md:hidden">
    <div className="flex flex-col items-center justify-center border-b-2 pb-2">
      <Image src={"/logo.png"} alt="logo" width={70} height={70} />
      <span className="text-gray-200 font-bold text-xl text-center">C.P.G.E</span>
    </div>
    <div className="mt-5">
      {selectedMenu.map((menu, index) => (
        <Link href={menu.path} key={index}>
          <h5
            className={`flex gap-2 items-center
              text-sm  text-gray-300
              mb-1
              p-2 cursor-pointer
              hover:text-primary hover:bg-slate-700
              ${path == menu.path && "text-gray-50 bg-slate-700 font-bold"}
              `}
            >
              <menu.icon />
              {menu.name}
            </h5>
            </Link>
            ))}   
        <LogoutButton role={user.role} />
      </div>
    </div>
  );
}

export default NavBar;
