"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CalendarCheck2, BookUser, School, Mailbox, EyeOff, MessageSquare, FileBox } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/app/admin/_components/buttons/logout";

const menuListEtud = (userId: any) => [
  {
    id: 1,
    name: "Profile",
    icon: BookUser,
    path: `/profEspace`,
  },
  {
    id: 2,
    name: "Classes",
    icon: School,
    path: `/profEspace/classes/${userId}`,
  },
  {
    id: 3,
    name: "Absence",
    icon: EyeOff,
    path: "/profEspace/absence",
  },
  {
    id: 4,
    name: "Remarques",
    icon: MessageSquare,
    path: "#",
    subMenu: [
      { name: "Votre remarques", path: "/profEspace/remarque" },
      { name: "Ajouter remarque", path: `/profEspace/remarque/etudRemarque/${userId}` },
    ],
  },
  {
    id: 5,
    name: "News",
    icon: Mailbox,
    path: "#",
    subMenu: [
      { name: "Votre News", path: `/profEspace/news/${userId}` },
      { name: "Ajouter News", path: `/profEspace/news/add/${userId}` },
    ],
  },
  {
    id: 6,
    name: "Emplois",
    icon: CalendarCheck2,
    path: `/profEspace/emplois/${userId}`,
  },
  {
    id: 7,
    name: "Cours",
    icon: FileBox,
    path: "#",
    subMenu: [
      { name: "Votre Courses", path: `/profEspace/cours/${userId}` },
      { name: "Ajouter Cours", path: `/profEspace/cours/add/${userId}` },
    ],
  },
];

function NavBar(params: any) {
  const user = params.user;
  const [isRemarquesOpen, setIsRemarquesOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isCoursOpen, setIsCoursOpen] = useState(false);
  const path = usePathname();

  const toggleRemarquesMenu = () => setIsRemarquesOpen(!isRemarquesOpen);
  const toggleNewsMenu = () => setIsNewsOpen(!isNewsOpen);
  const toggleCoursMenu = () => setIsCoursOpen(!isCoursOpen);

  const selectedMenu = menuListEtud(user.id);

  return (
    <div className="h-screen p-5 border shadow-sm bg-slate-800 w-64">
      <div className="flex flex-col items-center justify-center border-b-2 pb-2">
        <Image src={"/logo.png"} alt="logo" width={70} height={70} />
        <span className="text-gray-200 font-bold text-xl text-center">C.P.G.E</span>
      </div>
      <div className="mt-5">
        {selectedMenu.map((menu, index) => (
          <div key={index}>
            <Link href={menu.path}>
              <h5
                className={`flex gap-2 items-center text-sm text-gray-300 mb-1 p-2 cursor-pointer hover:text-primary hover:bg-slate-700 ${
                  path == menu.path && "text-gray-50 bg-slate-700 font-bold"
                }`}
                onClick={
                  menu.name === "Remarques"
                    ? toggleRemarquesMenu
                    : menu.name === "News"
                    ? toggleNewsMenu
                    : menu.name === "Cours"
                    ? toggleCoursMenu
                    : undefined
                }
              >
                <menu.icon />
                {menu.name}
              </h5>
            </Link>

            {/* Render submenus for Remarques */}
            {menu.name === "Remarques" && isRemarquesOpen && (
              <div className="pl-6">
                {menu.subMenu?.map((subItem, subIndex) => (
                  <Link href={subItem.path} key={subIndex}>
                    <h6
                      className={`text-gray-300 mb-1 p-1 cursor-pointer hover:gray-200 hover:bg-slate-700 ${
                        path == subItem.path && "text-gray-50 bg-slate-700"
                      }`}
                    >
                      + {subItem.name}
                    </h6>
                  </Link>
                ))}
              </div>
            )}

            {/* Render submenus for News */}
            {menu.name === "News" && isNewsOpen && (
              <div className="pl-6">
                {menu.subMenu?.map((subItem, subIndex) => (
                  <Link href={subItem.path} key={subIndex}>
                    <h6
                      className={`text-gray-300 mb-1 p-1 cursor-pointer hover:gray-200 hover:bg-slate-700 ${
                        path == subItem.path && "text-gray-50 bg-slate-700"
                      }`}
                    >
                      + {subItem.name}
                    </h6>
                  </Link>
                ))}
              </div>
            )}

            {/* Render submenus for Cours */}
            {menu.name === "Cours" && isCoursOpen && (
              <div className="pl-6">
                {menu.subMenu?.map((subItem, subIndex) => (
                  <Link href={subItem.path} key={subIndex}>
                    <h6
                      className={`text-gray-300 mb-1 p-1 cursor-pointer hover:gray-200 hover:bg-slate-700 ${
                        path == subItem.path && "text-gray-50 bg-slate-700"
                      }`}
                    >
                      + {subItem.name}
                    </h6>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <LogoutButton role={user.role} />
      </div>
    </div>
  );
}

export default NavBar;
