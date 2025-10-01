"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MapPin, Mails, Phone,X ,Menu} from "lucide-react";
import logo from "@/public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { name: "Accueil", href: "/" },
  { name: "À Propos", href: "/a-propos" },
  { name: "Nos filières", href: "/nos-filieres" },
  { name: "Inscription", href: "/inscription" },
  { name: "Blog", href: "/blog" },
  {
    name: "Espace",
    submenu: [
      { name: "Espace Étudiant", href: "/etudiantEspace" },
      { name: "Espace Parent", href: "/parentEspace" },
      { name: "Espace Professeur", href: "/profEspace" },
    ],
  },
  { name: "Contact", href: "/contact" },
  
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="drop-shadow-md z-50 fixed top-0 left-0 right-0">
      <div className="hidden sm:flex bg-emerald-800 text-white py-2 text-center flex-row items-center justify-center">
        <MapPin className="w-5 h-5 mr-2" />
        <span>5 Rue Maati Bakhay-ex Jebli Rabat</span>
        <span className="mx-4">|</span>
        <Phone className="w-5 h-5 mr-2" />
        <span>0661.506950 / 0537.202920</span>
        <span className="mx-4">|</span>
        <Mails className="w-5 h-5 mr-2" />
        <span>cpgeibnelkhatib@gmail.com</span>
      </div>

      <div className="flex justify-between items-center xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap py-2 bg-white">
        {open ? 
        <X
          className="lg:hidden block h-6 w-6 cursor-pointer"
          onClick={() => setOpen(!open)}
        /> 
        : 
        <Menu
        className="lg:hidden block h-6 w-6 cursor-pointer"
        onClick={() => setOpen(!open)}
      />}
        <Link href="/">
          <div className="hidden sm:flex flex-shrink-0 items-center">
            <Image className="h-11 w-auto" src={logo} alt="Your Company" />
          </div>
        </Link>

        <nav
          className={`${
            open ? "block" : "hidden"
          } lg:flex lg:items-center lg:w-auto w-full`}
        >
          <ul className="text-base text-gray-600 lg:flex lg:justify-between">
            {links.map((link:any, index) =>
              link.submenu ? (
                <li
                  key={index}

                  className="relative lg:px-5 py-2 hover:text-green-600 font-semibold z-50"
                  onMouseEnter={() => setSubmenuOpen(true)}
                  onMouseLeave={() => setSubmenuOpen(false)}
                >
                  <span className="cursor-pointer">{link.name}</span>
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
                  onClick={()=>setOpen(false)}
                  className={`lg:px-5 py-2 hover:text-green-600 font-semibold ${path == link.href && "text-green-700 bg-gray-100  font-bold"}`}
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;










