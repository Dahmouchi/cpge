
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookUser, School, EyeOff, MessageSquare, BookOpenCheck, Mailbox } from "lucide-react";
import LogoutButton from "@/app/admin/_components/buttons/logout";

// Student-specific menu items
const menuListEtud = (userId: any) => [
  {
    id: 1,
    name: "Profile",
    icon: BookUser,
    path: `/etudiantEspace`,
  },
  {
    id: 2,
    name: "Classe",
    icon: School,
    path: `/etudiantEspace/classe/${userId}`, // Include user ID in the path
  },
  {
    id: 3,
    name: "Absence",
    icon: EyeOff,
    path: "/etudiantEspace/absence",
  },
  {
    id: 4,
    name: "Remarques",
    icon: MessageSquare,
    path: "/etudiantEspace/remarque",
  },
  {
    id: 5,
    name: "Notes",
    icon: BookOpenCheck,
    path: "/etudiantEspace/notes",
  },
  {
    id: 6,
    name: "News",
    icon: Mailbox,
    path: `/etudiantEspace/news/${userId}`,
  },
];

const Data = ({ userId }: { userId: any }) => {
  const path = usePathname();

  return (
    <div className="max-w-sm w-full mx-auto rounded-md z-50">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {/* Replace with menuListEtud */}
            {menuListEtud(userId).map((item) => (
              <div key={item.id}>
                <Link
                  href={item.path}
                  className={`text-gray-300 hover:bg-gray-200 uppercase hover:text-emerald-900 block p-2 rounded-md text-base font-medium ${
                    path === item.path && "text-gray-50 bg-slate-700 font-bold"
                  }`}
                >
                  {/* Render the icon if necessary */}
                  <item.icon className="inline-block mr-2" />
                  {item.name}
                </Link>
              </div>
            ))}
             <LogoutButton role="ETUDIANT" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
