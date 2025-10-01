"use client"
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
  } from "@/components/ui/dropdown-menu";
  import { ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import FileUploader from "@/components/fileupload";
import Loading from "@/components/loading";

const Page = () => {
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<File>();
    const [classes,setClasses] = useState<any[]>([])
    const [selectedClassName, setSelectedClassName] = useState<string | null>(null);

    useEffect(()=>{
        const getInfos=async()=>{
            const res = await axios.get(`/api/professeurs`)
            setClasses(res.data)
        }
        getInfos();
    },[])
    
    const addEmploi = async (formData: FormData) => {
        if(selectedClass && files){
            try {
               // Append selected class and files to FormData
              formData.append("teacherId", selectedClass);

              // Append files to FormData
                formData.append("files", files); // Append each file to the FormData
              
                setLoading(true);
                const response = await axios.post(`/api/admin/emplois`, formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data", // Important for handling files
                    },
                  });
                if (response.status === 200) {
                  toast.success("Le contenu a été ajouté avec succès");
                  setLoading(false);
                } else {
                  toast.error("Une erreur est survenue");
                  setLoading(false);

                }
              } catch (error) {
                toast.error("Une erreur est survenue");
                setLoading(false);
              }
        }else{
            toast.error("saisir tous les champs"); 
        }
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        addEmploi(formData);
      };
    
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          setFiles(event.target.files[0]);
        }
      };
      const handleClassSelect = (id: string, firstName: string) => {
        setSelectedClass(id);
        setSelectedClassName(firstName);
      };
  if(loading){
    return <Loading/>
  }
  return (
    <div>
         <div className="bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2 mt-5">
          <div className="items-center mb-2">
            <div>
              <h1 className="text-2xl font-semibold mb-4">Ajouter un emploi de temp</h1>
              <h1 className="text-lg font-semibold mb-4">Ici, vous pouvez ajouter un emploi de temp pour les professeurs</h1>
            </div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border-lg p-4 space-y-2 border"
                            >
                 <div className=''>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button>
                            {selectedClassName ? `Professeur sélectionnée: ${selectedClassName}` : "sélectionner Professeur"}
                            <ChevronDown className='ml-2' />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuLabel>Sélectionnez le professeur</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {classes.map((cls:any) => (
                            <DropdownMenuItem key={cls.id} onClick={() => handleClassSelect(cls.id, cls.user.firstName)}>
                                {cls.user.firstName} {cls.user.lastName}
                            </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                  <Input placeholder="Titre d'emploi" name="title" required/>
                  <AutosizeTextarea
                    placeholder="Votre message pour les étudiants ici"
                    name="body"
                    required
                  />
                   <div className="mb-3 w-96">
                    <input
                      className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                      id="formFileLg"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="space-x-2">
                    <Button disabled={loading} type="submit" className="float-right">
                    {loading? "En cours..." : "Ajouter"}
                    </Button>
                  </div>
                </form>
          </div>   
          </div>
          
    </div>
  )
}

export default Page