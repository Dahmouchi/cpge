import React, { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {
  return (
    <main
      className={`fixed inset-0 z-10 transform overflow-hidden bg-gray-900 bg-opacity-25 transition-all duration-500 ease-in-out ${
        isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
      }`}
    >
      <section
        className={`absolute left-0 h-full w-[340px] max-w-lg transform bg-white shadow-xl transition-all duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <article className="flex h-full flex-col space-y-6 pb-10">
          <header className="flex items-center justify-between p-4">
            <Link href="/"><Image
              className="h-14 w-auto"
              src={logo}
              alt="Courses-Logo"
              onClick={() => {
                setIsOpen(false);
              }}
            /></Link>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </header>
          <div
            onClick={() => {
              setIsOpen(false);
            }}
          >
            {children}
          </div>
        </article>
      </section>
      <section
        className="h-full w-screen cursor-pointer"
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
};

export default Drawer;
