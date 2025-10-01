"use client";
import FileUploader from "@/components/fileupload";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Label } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import {toast} from "react-toastify";

const AddCoursTab = ({ onAddContent, id,professeur,classId }: any) => {
  const [files, setFiles] = useState<File>();
  const [loading, setLoading] = useState(false);
  const { getItem } = useLocalStorage("user");
  const [selectedTeacher, setSelectedTeacher] = useState('');


  const addContent = async (formData: FormData) => {
    if(files){
    try {
      setLoading(true);
      // Append selected class and files to FormData
      formData.append("classId", id);

      // Append files to FormData
        formData.append("files", files); // Append each file to the FormData
        formData.append("teacherId", selectedTeacher);


      const response = await axios.post(`/api/prof/classes/${id}/content`, 
        formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for handling files
            },
          });
      if (response.status === 200) {
        toast.success("Le contenu a été ajouté avec succès");
      } else {
        toast.error("Une erreur est survenue");
      }
      onAddContent();
    } catch (error) {
      toast.error("Une erreur est survenue");
      setLoading(false);
    }
  }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addContent(formData);
  };

 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files[0]);
    }
  };

  
    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white border-lg p-4 space-y-2 border"
      >
        <Input placeholder="Titre du contenu" name="title" required/>
        <AutosizeTextarea
          placeholder="Votre message pour les étudiants ici"
          name="body"
          required
        />
        <div className="grid grid-cols-4 items-center gap-4">
                      
                      <select
                        id="teacher"
                        name="teacherId"
                        className="col-span-3 h-10 rounded-sm border-2 border-gray-200 w-full"
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                      >
                        <option value="">Sélectionner un enseignant</option>
                        {professeur.map((teacher:any) => (
                          <option key={teacher.user.id} value={teacher.user.id}>
                            {teacher.user.firstName} {teacher.user.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
        
                    <input
                    className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    id="formFileLg"
                    type="file"
                    onChange={handleFileChange}
                  />
        <div className="space-x-2">
          <Button disabled={loading} type="submit" className="float-right">
          {loading? "En cours..." : "Ajouter"}
          </Button>
        </div>
      </form>
    );
  
};

export default AddCoursTab;
