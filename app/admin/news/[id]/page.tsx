"use client";
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
import { useState, useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import ReusableComponent from "@/components/ui/v0-blocks/reusable-feed-block-news";
import { useLocalStorage } from "@/hooks/useLocalStorage"
import Loading from "@/components/loading";
import FileUploader from "@/components/fileupload";
type Professeur = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    statut: boolean;
    adress:string;
  };
};
const NewsManagement = ({ params }: { params: { id: string } }) => {
  const id = params.id.toString();
  const [matieres, setMatieres] = useState<any>();
  const [update, setUpdate] = useState(false);
  const [theClass, setTheClass] = useState<any>();
  const [professeurs, setProfesseurs] = useState<Professeur[]>([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File>();
  const [selectedTeacher, setSelectedTeacher] = useState('');



  useEffect(() => {
    const getInfos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/admin/news/${id}`);
        setMatieres(response.data);
        const fetchedProfesseurs = await axios.get('/api/professeurs');
        setProfesseurs(fetchedProfesseurs.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getInfos();
  }, [update,id]);

  useEffect(() => {
    axios
      .get(`/api/prof/classes`)
      .then((response) => {
        const selectedClass = response.data.find(
          (classe: any) => classe.id === id
        );
        setTheClass(selectedClass);
      })
      .catch((error) => {
        console.log("error getting classes", error);
      });
  }, [id]);

  const addNews = async (formData: FormData) => {
    if(files){

    try {
      setLoading(true);
      formData.append("classId", id);
      formData.append("teacherId", selectedTeacher);

      // Append files to FormData
        formData.append("files", files); // Append each file to the FormData
      

      const response = await axios.post(`/api/prof/classes/${id}/news`,  formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for handling files
          },
        });
      if (response.status === 200) {
        toast.success("Le contenu a été ajouté avec succès");
        setUpdate(!update);
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
    addNews(formData);
  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files[0]);
    }
  };
  const ScrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        console.log(`Scrolling into view for element with ID: ${id}`);
    } else {
        console.log(`Element with ID ${id} not found.`);
    }
};
  if(loading){
    return <Loading />
  }

  return (
    <>
      <div className="flex flex-col">
      <div className="bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2 mt-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-semibold mb-4">Ajouter une publication </h1>
              <h1 className="text-lg font-semibold mb-4">Ici, vous pouvez ajouter une publication pour la classe {theClass?.name}</h1>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                  <Button >Ajouter Publication</Button>

                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Ajouter une nouvelle</DialogTitle>
                    <DialogDescription>
                      Veuillez renseigner le titre de la publication à ajouter
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white border-lg p-4 space-y-2 border"
                            >
                  <Input placeholder="Titre de nouvelle" name="title" required/>
                
                  <AutosizeTextarea
                    placeholder="Votre message pour les étudiants ici"
                    name="body"
                    required
                  />
                      <select
                        id="teacher"
                        name="teacher"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                      >
                        <option value="">Sélectionner un enseignant</option>
                        {professeurs.map((teacher) => (
                          <option key={teacher.user.id} value={teacher.user.id}>
                            {teacher.user.firstName} {teacher.user.lastName}
                          </option>
                        ))}
                      </select>
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
          
          </div>
          <div>
          <div className="w-full flex flex-col-reverse sm:flex-row justify-between space-x-4 ">
          <div className="w-full sm:w-[80%] bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2 overflow-y-auto h-96">
          <form
                onSubmit={handleSubmit}
                className="bg-white border-lg p-4 space-y-2 border"
                            >
                  <Input placeholder="Titre de nouvelle" name="title" required/>
                
                  <AutosizeTextarea
                    placeholder="Votre message pour les étudiants ici"
                    name="body"
                    required
                  />
                      <select
                        id="teacher"
                        name="teacher"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                      >
                        <option value="">Sélectionner un enseignant</option>
                        {professeurs.map((teacher) => (
                          <option key={teacher.user.id} value={teacher.user.id}>
                            {teacher.user.firstName} {teacher.user.lastName}
                          </option>
                        ))}
                      </select>
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
            <div className="bg-white border-lg p-4 space-y-2 border ">
              <h1>Dernières publications</h1>
              <div className="flex flex-col ">
                {matieres &&
                  matieres.map((matieres: any) => (
                    <div key={matieres.id}>
                    <ReusableComponent matieres={matieres} key={matieres.id} onDelete={()=>setUpdate(!update)} role="ADMIN"/>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full sm:w-[20%] bg-white rounded-lg p-4 drop-shadow-sm">
            <h1 className="text-lg">Les publication</h1>
            <div className="flex flex-col py-2">
              {matieres &&
                matieres.map((matieres: any) => (
                  <div
                    key={matieres.id}
                    onClick={() => ScrollIntoView(matieres.id)}
                    className="cursor-pointer bg-white hover:bg-slate-100 transition-colors ease-out w-full h-10 flex items-center px-2 border-y"
                  >
                    {matieres.title}
                  </div>
                ))}
            </div>
          </div>
        </div>
          </div>
      </div>
    </>
  );
};

export default NewsManagement;
