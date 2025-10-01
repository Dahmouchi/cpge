"use client"
import React, { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { MapPin, Mails, Phone,X ,ChevronDown} from "lucide-react";
import { usePathname } from "next/navigation";
import Drawer from "./Drawer";
import { Bars3Icon } from "@heroicons/react/24/outline";
import DrawerData from "./Drawerdata";
import Link from "next/link";

    
const links = [
  { name: "Accueil", href: "/", current: false },
  { name: "À Propos", href: "/a-propos", current: false },
  { name: "Nos filières", href: "/nos-filieres", current: false },
  { name: "Inscription", href: "/inscription", current: false },
  { name: "Blog", href: "/blog" },
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
const Header = () => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="w-full">
      <div className="flex justify-between items-center bg-white shadow">
      {/* Top Navbar */}
      <Link href="/" className="">
      <Image
              src="/LogoVertical.png" // Replace with your logo path
              alt="Logo"
              width={200}
              height={100}
              className="ml-5"
            /></Link>
      <div className=" w-2/3">
      <div className="">
        <div className=" hidden lg:flex justify-between items-center px-4 bg-emerald-700 py-2 rounded-bl-xl">
          <div className="flex items-center space-x-4  text-white text-sm">
            <MapPin className="w-5 h-5 mr-2" />
            <span>5 Rue Maati Bakhay-ex Jebli Rabat</span>
            <span className="mx-4">|</span>
            <Phone className="w-5 h-5 mr-2" />
            <span>0661.506950 / 0537.202920</span>
            <span className="mx-4">|</span>
            <Mails className="w-5 h-5 mr-2" />
            <span>cpgeibnelkhatib@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2  text-white text-sm">
            {open && <input
              type="text"
              placeholder="Search by keywords"
              className="bg-white text-black rounded px-2"
            />}
            <button className="text-white" onClick={()=>setOpen(!open)}>
              <FaSearch className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="">
        <div className="container mx-auto flex justify-between items-center pt-4 px-4">
          <div className="flex items-center space-x-4">
           
            <nav className="hidden lg:flex items-center space-x-8 text-black text-sm">
              <ul className="text-base text-gray-600 lg:flex lg:justify-between">
              {links.map((link:any, index) =>
                link.submenu ? (
                  <li
                    key={index}

                    className="relative lg:px-5 py-4 hover:text-green-600 hover:border-b-2 uppercase hover:border-emerald-800 z-50 "
                    onMouseEnter={() => setSubmenuOpen(true)}
                    onMouseLeave={() => setSubmenuOpen(false)}
                  >
                    <span className="cursor-pointer flex"><div>{link.name}</div> <ChevronDown className="mt-1 ml-1"/></span>
                    {submenuOpen && (
                      <ul className="absolute left-0 bg-white shadow-lg rounded-md py-2">
                        {link.submenu.map((sublink:any, subIndex:any) => (
                          <li
                            key={subIndex}
                            className="px-2 w-40 py-2 text-gray-800 hover:bg-gray-200"
                          >
                            <Link href={sublink.href}>{sublink.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li
                    key={index}
                    className={`lg:px-5 py-4 hover:text-green-600 hover:border-b-4 hover:border-emerald-800 uppercase ${path == link.href && "text-green-700  border-b-4 border-emerald-700  font-bold"}`}
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                )
              )}
            </ul>
            </nav>
          </div>
          <div >
            <Link href="/cours" className="hidden lg:block">
            <button className="before:ease text-white rounded-full relative h-12 w-40 overflow-hidden border-2 bg-emerald-700 border-emerald-700 shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-white before:transition-all before:duration-300 hover:text-emerald-800 hover:shadow-black hover:before:-rotate-180">
              <span className="relative z-10">COURS</span>
            </button>
            </Link>
          </div>
        </div>
      </div>
      </div>
      <div className="block lg:hidden mr-5">
              <Bars3Icon
                className="block h-10 w-10 cursor-pointer"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>

            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <DrawerData />
            </Drawer>
      </div>
    </header>
  );
};

export default Header;
