// _components/header/page.tsx
"use client"
import Link from "next/link";
import DropdownUser from "./DropdownUser";

import {AlignJustify, User} from "lucide-react"
import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Drawer from "../Drawer";
import DrawerData from "../Drawerdata";
import { Button } from "@/components/ui/button";

export default function Header(props: {
  user: any;
  role:string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  
  return (
    <header className="sticky top-0 z-50 flex w-full bg-white drop-shadow-1 dark:bg-boxdark shadow-md">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">  
        <div className="hidden lg:block">
          
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <AlignJustify />
              </button>

              <div className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125">
                Espace {props.role}
              </div>
            </div>
          
        </div>

        <div className="flex items-center gap-3">       
          {/* <!-- User Area --> */}
          <DropdownUser user={props.user}/>
          {/* <!-- User Area --> */}
        </div>
        <div className="block  lg:hidden mr-5">
              <Bars3Icon
                className="block h-10 w-10 cursor-pointer"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>

            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <DrawerData userId={props.user.id} />
            </Drawer>
      </div>
    </header>
  );
}
