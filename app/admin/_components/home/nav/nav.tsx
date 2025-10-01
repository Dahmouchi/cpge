"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LayoutGrid ,FileVideo, StickyNote,CalendarCheck2, UserRound, BookUser, School, BookText, EyeOff, MessageSquare ,BookOpenCheck} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoutButton from "../../buttons/logout";
const menuList = [
  {
    id: 1,
    name: "Accueil",
    icon: LayoutGrid,
    path: "/admin",
  },

  {
    id: 2,
    name: "Préinscription",
    icon: BookText,
    path: "/admin/forms",
  },
  {
    id: 3,
    name: "Posts",
    icon: StickyNote,
    path: "/admin/posts",
  },
  {
    id: 10,
    name: "Cours videos",
    icon: FileVideo,
    path: "/admin/video",
  },
  {
    id: 4,
    name: "Professeurs",
    icon: UserRound,
    path: "/admin/professeurs",
  },
  {
    id: 5,
    name: "Etudiants",
    icon: BookUser,
    path: "/admin/etudiants",
  },
  {
    id: 6,
    name: "Classes",
    icon: School,
    path: "#", // Changed path to "#" since it's just a toggle
    subMenu: [
      { name: "ajouter Classe", path: "/admin/classes" },
      { name: "ajouter News", path: "/admin/news" },
    ],
  },
  {
    id: 6,
    name: "Emplois",
    icon: CalendarCheck2,
    path: "#", // Changed path to "#" since it's just a toggle
    subMenu: [
      { name: "pour Classe", path: "/admin/emplois/classes" },
      { name: "pour Prof", path: "/admin/emplois/prof" },
    ],
  },
  {
    id: 7,
    name: "Absence/Retard",
    icon: EyeOff,
    path: "#", // Changed path to "#" since it's just a toggle
    subMenu: [
      { name: "Etudiants", path: "/admin/absence/etudiants" },
      { name: "Professeurs", path: "/admin/absence/professeurs" },
    ],
  },
  {
    id: 8,
    name: "Remarques",
    icon: MessageSquare,
    path: "#", // Changed path to "#" since it's just a toggle
    subMenu: [
      { name: "Etudiants", path: "/admin/remark/etudiants" },
      { name: "Professeurs", path: "/admin/remark/professeurs" },
    ],
  },
  {
    id: 9,
    name: "Notes",
    icon: BookOpenCheck,
    path: "#", // Changed path to "#" since it's just a toggle
    subMenu: [
      { name: "Ajouter", path: "/admin/grads/create" },
      { name: "Afficher/Modifier", path: "/admin/grads/update" },
    ],
  },
];

function NavBar(params: any) {
  const user = params.user;
  const [isClassesOpen, setIsClassesOpen] = useState(false); 
  const [isAbsenceOpen, setIsAbsenceOpen] = useState(false); 
  const [isRemarquesOpen, setIsRemarquesOpen] = useState(false); 
  const [isNoteOpen, setIsNoteOpen] = useState(false); 
  const [isEmploiOpn, setIsEmploiOpn] = useState(false); 

  const path = usePathname();

  const toggleClassesMenu = () => {
    setIsClassesOpen(!isClassesOpen);
  };
  const toggleNoteMenu = () => {
    setIsNoteOpen(!isNoteOpen);
  };
  const toggleAbsenceMenu = () => {
    setIsAbsenceOpen(!isAbsenceOpen);
  };

  const toggleRemarquesMenu = () => {
    setIsRemarquesOpen(!isRemarquesOpen);
  };
  const toggleEmploiMenu = () => {
    setIsEmploiOpn(!isEmploiOpn);
  };

  const selectedMenu = menuList;

  return (
    <div className="h-screen p-5 border shadow-sm bg-slate-800 w-64">
      <div className="flex flex-col items-center justify-center border-b-2 p-2 mb-2 bg-white rounded-lg ">
        <Image src={"/logo.png"} alt="logo" width={70} height={70} className="w-44 h-auto"/>
      </div>
      <div className="mt-5">
        {selectedMenu.map((menu:any, index) => (
          <Link href={menu.path} key={index}>
            <h5
              className={`flex gap-2 items-center
                text-sm  text-gray-300
                mb-1
                p-2 cursor-pointer
                hover:animate-pulse
                hover:text-gray-50 hover:bg-slate-700
                ${path == menu.path && "text-gray-50 bg-slate-700 font-bold"}
                `}
              onClick={
                menu.name === "Classes"
                  ? toggleClassesMenu
                  : menu.name === "Absence/Retard"
                  ? toggleAbsenceMenu
                  : menu.name === "Remarques"
                  ? toggleRemarquesMenu
                  : menu.name === "Emplois"
                   ? toggleEmploiMenu
                  : menu.name === "Notes"
                  ? toggleNoteMenu
                  : undefined
              } // Toggle submenus
            >
              <menu.icon className="h-5 w-5"/>
              {menu.name}
            </h5>

            {/* Render submenus */}
            {menu.name === "Classes" && isClassesOpen && (
              <div className="pl-6">
                {menu.subMenu?.map((subItem:any, subIndex:any) => (
                  <Link href={subItem.path} key={subIndex}>
                    <h6 className={`text-gray-500 mb-1 p-2 cursor-pointer hover:text-white hover:bg-slate-700 ${path == subItem.path && "text-white font-bold bg-slate-700"}`}>
                      + {subItem.name}
                    </h6>
                  </Link>
                ))}
              </div>
            )}
            {menu.name === "Notes" && isNoteOpen && (
              <div className="pl-6">
                {menu.subMenu?.map((subItem:any, subIndex:any) => (
                  <Link href={subItem.path} key={subIndex}>
                    <h6 className={`text-gray-500 mb-1 p-2 cursor-pointer hover:text-white hover:bg-slate-700 ${path == subItem.path && "text-white font-bold bg-slate-700"}`}>
                      + {subItem.name}
                    </h6>
                  </Link>
                ))}
              </div>
            )}
            {menu.name === "Absence/Retard" && isAbsenceOpen && (
              <div className="pl-6">
                {menu.subMenu?.map((subItem:any, subIndex:any) => (
                  <Link href={subItem.path} key={subIndex}>
                    <h6 className={`text-gray-500 mb-1 p-2 cursor-pointer  hover:text-white hover:bg-slate-700 ${path == subItem.path && "text-white font-bold bg-slate-700"}`}>
                      + {subItem.name}
                    </h6>
                  </Link>
                ))}
              </div>
            )}

            {menu.name === "Remarques" && isRemarquesOpen && (
              <div className="pl-6">
                {menu.subMenu?.map((subItem:any, subIndex:any) => (
                  <Link href={subItem.path} key={subIndex}>
                    <h6 className={`text-gray-500 mb-1 p-2 cursor-pointer hover:text-white hover:bg-slate-700 ${path == subItem.path && "text-white font-bold bg-slate-700"}`}>
                      {subItem.name}
                    </h6>
                  </Link>
                ))}
              </div>
            )}
             {menu.name === "Emplois" && isEmploiOpn && (
              <div className="pl-6">
                {menu.subMenu?.map((subItem:any, subIndex:any) => (
                  <Link href={subItem.path} key={subIndex}>
                    <h6 className={`text-gray-500 mb-1 p-2 cursor-pointer hover:text-white hover:bg-slate-700 ${path == subItem.path && "text-white font-bold bg-slate-700"}`}>
                      + {subItem.name}
                    </h6>
                  </Link>
                ))}
              </div>
            )}
          </Link>
        ))}
        <LogoutButton role={user.role} />
      </div>
    </div>
  );
}

export default NavBar;
