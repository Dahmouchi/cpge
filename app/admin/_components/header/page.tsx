// _components/header/page.tsx
"use client"
import Link from "next/link";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import profile from "@/public/profile.jpg"
import {AlignJustify} from "lucide-react"

export default function Header(props: {
  user: any;
  role:string;
}) {
  
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark shadow-md">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
       

        <div className="hidden sm:block">
          
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
      </div>
    </header>
  );
}
