"use client"
  import {
    ReactElement,
    JSXElementConstructor,
    ReactNode,
    ReactPortal,
    AwaitedReactNode,
    useState,
  } from "react";
  import Image from "next/image";
  import { File } from "lucide-react";
import Link from 'next/link';
import { Trash } from "lucide-react";
import { Card } from './ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from './ui/button';
import {toast} from "react-toastify";

import axios from 'axios';
import Loading from "./loading";
const EmploiTab = (params: any) => {
  const  [loading,setLoading] = useState(false)
    const { emploi, variant, onItemClick } = params;
    const deleteEmploi= async(id: any)=>{ 
        try {
            const response = await axios.delete(
              `/api/prof/classes/${id}/emploi`

            );
            if (response.status === 200) {
              toast.success("Le contenu a été supprimé avec succès");
              onItemClick();
            }
          } catch (error) {
          }
    }

  return (
    <div>  
        <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72">
              <div
                className="relative h-30 mx-4 text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                 {emploi.document.length > 0 && (
                <div>
                    {emploi.document.map(
                    (file: {
                        filetype: string;
                        name:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<AwaitedReactNode>
                        | null
                        | undefined;
                        fileurl: any;
                    }) => {
                        if (file.filetype === "application/pdf") {
                        return (
                            <Link
                            key={emploi.document.indexOf(file)}
                            href={file.fileurl}
                            >
                            <Card className="p-4 flex flex-col justify-center items-center w-full h-full mt-3">
                                <File className="w-10 h-10" />
                                <h1 className="text-sm line-clamp-2 text-center px-4">
                                {file.name}
                                </h1>
                            </Card>
                            </Link>
                        );
                        } else {
                        return (
                            <Link
                            key={emploi.document.indexOf(file)}
                            href={file.fileurl}
                            >
                            <Card
                                key={emploi.document.indexOf(file)}
                                className=""
                            >
                                <img
                                src={file.fileurl}
                                alt="image"
                                width={100}
                                height={100}
                                />
                            </Card>
                            </Link>
                        );
                        }
                    }
                    )}
                </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex flex-row-reverse justify-between items-center">
                  <h5 className="block mb-2 font-sans text-sm antialiased  leading-snug tracking-normal text-blue-gray-800">
                    {emploi.goups[0]?.name}
                  </h5>
                  <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {emploi.name}
                  </h5>
                </div>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit whitespace-pre-line line-clamp-2">
                  {emploi.description}
                </p>

              </div>
              {params.role === "ADMIN" &&
              <div className="p-6 pt-0">
                
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button  className="align-middle flex justify-center items-center select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-700 text-white shadow-md shadow-red-900/10 hover:shadow-lg hover:shadow-red-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                        Supprimer
                        <Trash className="w-4 h-4 ml-2" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûrs?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteEmploi(emploi.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Continuer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
              </div>}
            </div> 
    </div>
  )
}

export default EmploiTab