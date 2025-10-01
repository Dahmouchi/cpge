import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import timeAgo from "@/lib/date";
import { ChevronDown, File } from "lucide-react";
import axios from "axios";
import {toast} from "react-toastify";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";

export default function ReusableComponent(params: any) {
  const content = params.content;
  const deleteContent = async () => {
    try {
      const response = await axios.delete(
        `/api/prof/classes/${content.id}/content`
      );
      if (response.status === 200) {
        toast.success("Le contenu a été supprimé avec succès");
        params.onDelete()

      }
    } catch (error) {}
  };
  return (
    <Card id={content.id} className="w-full mb-4">
      <CardContent className="flex flex-col items-start gap-4 p-4">
        <div className="w-full flex items-start gap-4">
          <Avatar className="flex-shrink-0">
            <AvatarImage src="/logo.png" />
            <AvatarFallback>
            {content.admin ?   "A" : content.teacher.user.lastName[0]}
             
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 w-full">
            <div className="w-full flex items-center space-x-4 justify-between">
              <div className="flex items-center space-x-3 font-medium">
              {content.admin  ? "Administration": content.teacher.user.lastName}
                <div className="ml-1 font-normal">
                {content.admin  ? "" :content.teacher.user.firstName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {timeAgo(content.createdAt)}
                </div>
              </div>
              {params.role === "ADMIN" &&
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <ChevronDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={deleteContent}>
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              }
              {params.role === "PROF" && content.teacher && !content.admin  &&
                  <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <ChevronDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={deleteContent}>
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                }
            </div>
            <div className="text-sm">
              <h1 className="text-lg mb-4 font-medium">{content.title}</h1>
              {params.role==="PROF" && <p>la matiére : {content?.subject.name}</p>}
              <p>{content.body}</p>
            </div>
            {content.document.length > 0 && (
              <div className="flex flex-row space-x-2">
                {content.document.map(
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
                          key={content.document.indexOf(file)}
                          href={file.fileurl}
                        >
                          <Card className="relative w-[100px] h-[130px] p-4 flex flex-col justify-center items-center">
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
                          key={content.document.indexOf(file)}
                          href={file.fileurl}
                        >
                          <Card
                            key={content.document.indexOf(file)}
                            className="relative w-[100px] h-[130px] p-4 flex flex-col justify-center items-center"
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
        </div>
      </CardContent>
    </Card>
  );
}
