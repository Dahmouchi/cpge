"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import {toast} from "react-toastify";
import { useRouter } from "next/navigation";

const DropdownBtn = (params: any) => {
  const router = useRouter();
  const { matiere, variant, onItemClick } = params;
  const handleItemClick = (id: number) => {
    onItemClick(id);
  };
  const deleteMatiere = async () => {
    try {
      const response = await axios.delete(`/api/prof/classes/${matiere.id}`);
      if (response.status === 200) {
        toast.success("La matière a été supprimé avec succès");
        location.reload();
      }
    } catch (error) {
      toast.error("Supprimer touts d'abord les cours ");
    }
  };

  if (variant === "outline") {
    return (
      <>
        <div className="flex">
          <div className="relative flex items-center transition-colors ease-in justify-start text-slate-900 border rounded-md cursor-pointer">
            <div
              onClick={() => handleItemClick(matiere.id)}
              className="text-slate-900 text-sm hover:bg-slate-100 pr-4 rounded-md cursor-pointer py-2 px-4 mr-8"
            >
              {matiere.name}
            </div>
            {params.role === "ADMIN" &&
              <div className="absolute  hover:bg-slate-100 right-0 w-8 flex justify-center items-center rounded-md  h-full">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Gestion</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Modifier</DropdownMenuItem>
                  <DropdownMenuItem onClick={deleteMatiere}>
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            }
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex">
          <div className="relative flex items-center transition-colors ease-in justify-start text-white bg-slate-900 border rounded-md cursor-pointer">
            <div
              onClick={() => handleItemClick(matiere.id)}
              className=" text-sm hover:bg-slate-800 pr-4 rounded-md cursor-pointer py-2 px-4 mr-8"
            >
              {matiere.name}
            </div>
            {params.role === "ADMIN" &&
              <div className="absolute right-0 w-8 flex justify-center items-center rounded-md  h-full">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Gestion</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Modifier</DropdownMenuItem>
                  <DropdownMenuItem onClick={deleteMatiere}>
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            }
          </div>
        </div>
      </>
    );
  }
};

export default DropdownBtn;
