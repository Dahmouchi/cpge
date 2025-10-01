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
import timeAgo from "@/lib/date";
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
const NewsTab = (params: any) => {
  const  [loading,setLoading] = useState(false)
    const { news, variant, onItemClick } = params;
    const deleteNews= async(id: any)=>{  
        try {
            const response = await axios.delete(
              `/api/admin/news/${id}`
            );
            if (response.status === 200) {
              toast.success("Le contenu a été supprimé avec succès");
              onItemClick();
            }
          } catch (error) {
            toast.success("un problème au cour de suppression");

          }
    }

  return (
        <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div className="bg-white overflow-hidden border-b-4 border-blue-500 ">
        <div className="relative  text-white shadow-lg bg-clip-border rounded-sm bg-blue-gray-500 shadow-blue-gray-500/40 w-full object-cover p-2">
              {news.document.length > 0 && (
                <div>
                    {news.document.map(
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
                            key={news.document.indexOf(file)}
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
                            key={news.document.indexOf(file)}
                            href={file.fileurl}
                            >
                            <Card
                                key={news.document.indexOf(file)}
                                className=""
                            >
                                <Image
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
          <div className="p-4 md:p-6">
            <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">News</p>
            <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">{news.title}</h3>
            <div className="text-sm flex items-center">
              <svg className="opacity-75 mr-2" xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Capa_1" x="0px" y="0px" width="12" height="12" viewBox="0 0 97.16 97.16"  >
                <path d="M48.58,0C21.793,0,0,21.793,0,48.58s21.793,48.58,48.58,48.58s48.58-21.793,48.58-48.58S75.367,0,48.58,0z M48.58,86.823    c-21.087,0-38.244-17.155-38.244-38.243S27.493,10.337,48.58,10.337S86.824,27.492,86.824,48.58S69.667,86.823,48.58,86.823z"/>
                <path d="M73.898,47.08H52.066V20.83c0-2.209-1.791-4-4-4c-2.209,0-4,1.791-4,4v30.25c0,2.209,1.791,4,4,4h25.832    c2.209,0,4-1.791,4-4S76.107,47.08,73.898,47.08z"/>
              </svg>
              <p className="leading-none">{timeAgo(news.createdAt)}</p>
            </div>
            <div>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit whitespace-pre-line line-clamp-2">
                  {news.body}
                </p>
            </div>
            {params.role==="ADMIN" &&
            <div className="flex justify-end">
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
                          onClick={() => deleteNews(news.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Continuer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
              </div>
              }
          </div>      
        </div>
    </div>
  )
}

export default NewsTab