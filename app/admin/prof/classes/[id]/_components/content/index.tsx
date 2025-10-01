"use client";
import FileUploader from "@/components/fileupload";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { File, ImagePlay } from "lucide-react";
import { useEffect, useState } from "react";
import {toast} from "react-toastify";

const AddCoursTab = ({ onAddContent, id }: any) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  
  const addContent = async (formData: FormData) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/prof/classes/${id}/content`, {
        title: formData.get("title")?.toString(),
        body: formData.get("body")?.toString(),
        files: files,
      });
      if (response.status === 200) {
        toast.success("Le contenu a été ajouté avec succès");
        location.reload();
      } else {
        toast.error("Une erreur est survenue");
      }
      onAddContent((prev: boolean) => !prev);
    } catch (error) {
      toast.error("Une erreur est survenue");
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addContent(formData);
  };

  const setFilesToUpload = (files: File[]) => {
    setFiles(files);
  }

  if (id !== 0) {
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
        <div className="flex flex-col space-y-2">
          <FileUploader setFilesToUpload={setFilesToUpload}/>
        </div>
        <div className="space-x-2">
          <Button disabled={loading} type="submit" className="float-right">
            Partager
          </Button>
        </div>
      </form>
    );
  } else {
    return null;
  }
};

export default AddCoursTab;
