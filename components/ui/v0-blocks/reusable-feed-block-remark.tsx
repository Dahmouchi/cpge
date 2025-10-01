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

  export default function ReusableComponent(params: any) {
    const content = params.remarque;
    const deleteContent = async () => {
      try {
        const response = await axios.delete(
          `/api/remarks/${content.id}`
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
              <AvatarImage src="/LogoVertical.png" />
              <AvatarFallback>
                A
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 w-full">
              <div className="w-full flex items-center space-x-4 justify-between">
                <div className="flex items-center space-x-3 font-medium">
                  <div className="ml-1 font-normal">
                    <h1>Administration</h1>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {timeAgo(content.createdAt)}
                  </div>
                </div>
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
              </div>
              <div className="text-sm">
                <h1 className="text-lg mb-4 font-medium">Remarque</h1>
                <p>{content.content}</p>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  