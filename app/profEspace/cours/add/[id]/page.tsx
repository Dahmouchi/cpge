'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import FileUploader from "@/components/fileupload";
import axios from 'axios';
import Loading from "@/components/loading";
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { toast } from 'react-toastify';

const Classes = ({params}:any) => {
  const [classes, setClasses] = useState<any[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<any[]>([]);
  const [files, setFiles] = useState<File>();
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [classeSelectioner,setClasseSelectioner] = useState<any[]>([])
  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await axios.get(`/api/professeurs/${params.id}`);
        setClasses(response.data.classes);
        setFilteredClasses(response.data.classes);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };
    getClasses();
  }, [params.id]);

  useEffect(() => {
    setFilteredClasses(
      classes.filter((classe) =>
        classe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classe.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, classes]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files[0]);
    }
  };
  const addContent = async (formData: FormData) => {
    if(files){
    try {
      setLoading(true);
      formData.append("files", files); // Append each file to the FormData

      const response = await axios.post(`/api/prof/classes/${selectedTeacher}/content`,  formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for handling files
          },
        });
      if (response.status === 200) {
        toast.success("Le contenu a été ajouté avec succès");
        setLoading(false)
      } else {
        toast.error("Une erreur est survenue");
      }
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


  
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10 space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Sélectionner la class pour ajouter un cour</h1>
          <div className="flex justify-between items-center">
          <Input
            type="text"
            placeholder="Rechercher par nom ou identifiant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 mr-3"
          />
          <div className=' bg-slate-200 p-2.5 rounded-sm'>
            <Search className="w-4 h-4"/>
          </div>
          </div>
        </div>
        <Card className='p-3'>
        <Table>
          <TableCaption>{filteredClasses.length === 0 ? "Le tableau est vide" : "La liste des classes disponibles."}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Identifiant</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.map((classe:any) => (
              <TableRow key={classe.id}>
                <TableCell className="font-medium">{classe.id}</TableCell>
                <TableCell>{classe.name}</TableCell>
                <TableCell>{classe.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-center items-center">         
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={()=>setClasseSelectioner(classe.subjects)} ><Plus /></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Ajouter Cours</DialogTitle>
                        <DialogDescription>
                          Veuillez renseigner le titre de cour à ajouter
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleSubmit}
                        className="bg-white border-lg p-4 space-y-2 border"
                                >
                      <Input placeholder="Titre de cour" name="classeId" required value={classe.id}/>
                      <div className="grid grid-cols-4 items-center gap-4">
                      
                      <select
                        id="teacher"
                        name="teacherId"
                        className="col-span-3 h-10 rounded-sm border-2 border-gray-200 w-full"
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                      >
                        <option value="">Sélectionner la matiére</option>
                        {classeSelectioner.map((teacher:any) => (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                          </option>
                        ))}
                      </select>
                    </div>
                      <Input placeholder="Titre de cour" name="title" required/>
                      <AutosizeTextarea
                        placeholder="Votre message pour les étudiants ici"
                        name="body"
                        required
                      />
                      
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
                    </DialogContent>
                  </Dialog>       
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Card>
      </div>
    </div>
  );
};

export default Classes;
