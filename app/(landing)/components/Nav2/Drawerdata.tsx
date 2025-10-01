import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItem {
  name: string;
  href?: string;
  current?: boolean;
  submenu?: NavigationItem[]; // Add this line to allow nested submenus
}

const links: NavigationItem[] = [
  { name: "Accueil", href: "/", current: false },
  { name: "À Propos", href: "/a-propos", current: false },
  { name: "Nos filières", href: "/nos-filieres", current: false },
  { name: "Inscription", href: "/inscription", current: false },
  { name: "Blog", href: "/blog", current: false },
  {
    name: "Espace",
    submenu: [
      { name: "Espace Étudiant", href: "/etudiantEspace", current: false },
      { name: "Espace Parent", href: "/parentEspace", current: false },
      { name: "Espace Professeur", href: "/profEspace", current: false },
    ],
  },
  { name: "Contact", href: "/contact", current: false },
];

const Data = () => {
  const path = usePathname();

  return (
    <div className="max-w-sm w-full mx-auto rounded-md">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {links.map((item:any) => (
              <div key={item.name}>
                <Link
                  href={item.href || "#"}
                  className={`text-emerald-700 hover:bg-gray-200 uppercase hover:text-emerald-900 block p-2 rounded-md text-base font-medium ${path === item.href && "text-green-700 bg-gray-200 rounded-none font-bold"}`}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>

                {/* Render submenu if it exists */}
                {item.submenu && (
                  <div className="ml-4">
                    {item.submenu.map((subItem:any) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href || "#"}
                        className={`text-emerald-700 hover:bg-gray-200 hover:text-emerald-900 block p-2 rounded-md text-base font-medium ${path === subItem.href && "text-green-700 bg-gray-100 font-bold"}`}
                        aria-current={subItem.current ? "page" : undefined}
                      >
                        - {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
             <div className="w-full">
              <Link href="/cours" >
              <button className="before:ease text-white rounded-full relative h-12 w-full overflow-hidden border-2 bg-emerald-700 border-emerald-700 shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-white before:transition-all before:duration-300 hover:text-emerald-800 hover:shadow-black hover:before:-rotate-180">
                <span className="relative z-10">COURS</span>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
