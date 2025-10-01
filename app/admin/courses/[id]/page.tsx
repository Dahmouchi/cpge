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
import { Label } from "@/components/ui/label";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { useState, useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import AddCoursTab from "../../../../components/index";
import ReusableComponent from "@/components/ui/v0-blocks/reusable-feed-block";
import DropdownBtn from "@/components/ui/dropdown-btn";
import Loading from "@/components/loading";
import EmploiTab from "@/components/emploiTab";

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
const ClasseManagerProf = ({ params }: { params: { id: string } }) => {
  const id = params.id.toString();
  const [matiereSelectionne, setMatiereSelectionne] = useState(0);
  const [matieres, setMatieres] = useState<any>();
  const [content, setContent] = useState<any>();
  const [update, setUpdate] = useState(false);
  const [theClass, setTheClass] = useState<any>();
  const [professeurs, setProfesseurs] = useState<Professeur[]>([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File>();
  const [emploi,setEmploi] = useState<any>();

  
  const [selectedTeacher, setSelectedTeacher] = useState('');

  useEffect(() => {
    setMatiereSelectionne(0);
    const getInfos = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/classes/${id}`)
        setEmploi(res.data.emploi)
        setMatieres(res.data.subjects);
      if (matiereSelectionne) {
        setMatiereContent(matiereSelectionne);
      }
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

  const addMatiere = async (formData: FormData) => {
    setLoading(true);
    const response = await axios.post(`/api/admin/courses/${id}`, {
      name: formData.get("matiereName")?.toString(),
      description: formData.get("matiereDescription")?.toString(),
      teacher: formData.get("teacher")?.toString(),
    });
    setLoading(false);
    if (response.status === 200) {
      toast.success("La matière a été ajoutée avec succès");
      setUpdate(!update);
    } else {
      toast.error("Une erreur est survenue");
    }
  };

  const ScrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log(`Element with ID ${id} not found.`);
    }
  };


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

  const setMatiereContent = async (id: number) => {
    setMatiereSelectionne(id);
    const contenu = matieres.find((matiere: any) => matiere.id === id);
    console.log(contenu.contents)
    setContent(contenu.contents);
  };
  const addEmploi = async (formData: FormData) => {
    if (id && files) {

    try {
      setLoading(true);
       // Append selected class and files to FormData
       formData.append("classId", id);

       // Append files to FormData
         formData.append("files", files); // Append each file to the FormData
       

         const response = await axios.post(
          `/api/prof/classes/${id}/emploi`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for handling files
            },
          }
        );
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
    addEmploi(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files[0]);
    }
  };
  const refresh=() => {
    setUpdate(!update);
    setMatiereSelectionne(0)
  }

  if(loading){
    return <Loading />
  }
  return (
    <>
      <div className="flex flex-col">
      <h1 className="text-4xl font-semibold mb-3">La classe {theClass?.name}</h1>
      <div className="bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2 mt-5">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-2xl font-semibold mb-4">Ajouter un emploi de temp</h1>
              <h1 className="text-lg font-semibold mb-4">Ici, vous pouvez ajouter un emploi de temp pour la classe {theClass?.name}</h1>

            </div>
            <Dialog>
                <DialogTrigger asChild>
                  <Button >Ajouter Emploi</Button>

                </DialogTrigger>
                <DialogContent className="max-w-4xl sm:max-w-2xl md:max-w-3xl lg:max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Ajouter un emploi</DialogTitle>
                    <DialogDescription>
                      Veuillez renseigner le nom de l'emploi à ajouter
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white border-lg p-4 space-y-2 border"
                            >
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
                </DialogContent>
              </Dialog>       
          </div>   
          </div>
          <div>
          <div className="w-full grid grid-cols-4 mb-3">
            {emploi?.map((matiere: any) => (
              <div className=""  key={matiere.id}>
                <EmploiTab
                  key={matiere.id}
                  emploi={matiere}
                  onItemClick={() => {setUpdate(!update)}}
                  role="ADMIN"
                />
              </div>
            ))}
           
          </div>
          </div>
        <div className="bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-semibold mb-4">Ajouter des Matiére et coures</h1>
              <h1 className="text-lg font-semibold">
                 Créer un nouveau cours pour {theClass?.name}
              </h1>
              <h2>
                Ici, vous pouvez gérer le contenu pédagogique pour les étudiants
              </h2>
            </div>
            <div className="flex justify-end flex-col">
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button >Ajouter une matière</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Ajouter une matière</DialogTitle>
                    <DialogDescription>
                      Veuillez renseigner le nom de la matière à ajouter
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      addMatiere(formData);
                    }}
                    className="grid gap-4 py-4"
                  >
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nom
                      </Label>
                      <Input
                        id="name"
                        name="matiereName"
                        defaultValue=""
                        placeholder="Eg: Mathématiques"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        name="matiereDescription"
                        defaultValue=""
                        placeholder="Eg: Mathématiques pour les MPSI2"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="teacher" className="text-right">
                        Enseignant
                      </Label>
                      <select
                        id="teacher"
                        name="teacher"
                        className="col-span-3"
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
                    </div>
                    <Button disabled={loading} type="submit">
                      Ajouter
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="w-full flex space-x-2">
            {matieres?.map((matiere: any) => (
              <DropdownBtn
                key={matiere.id}
                variant={
                  matiereSelectionne === matiere.id ? "outline" : "default"
                }
                matiere={matiere}
                onItemClick={() => {setMatiereContent(matiere.id)}}
                role="ADMIN"
              >
                {matiere.name}
              </DropdownBtn>
            ))}
          </div>
          <h1 className="text-sm text-gray-600">
            Veuillez cliquer sur une matière pour afficher le contenu approprié.
          </h1>
        </div>
        <div className="w-full flex flex-col-reverse sm:flex-row justify-between space-x-4 ">
          <div className="w-full sm:w-[80%] bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2 overflow-y-auto h-96">
            {matiereSelectionne !== 0 && 
             <AddCoursTab
             onAddContent={refresh}
             id={matiereSelectionne}
             professeur={professeurs}
             classId={id}
           />}
           
            {matiereSelectionne !== 0 &&
            
            <div className="bg-white border-lg p-4 space-y-2 border ">
            <h1>Dernières publications</h1>
            <div className="flex flex-col ">
              {content &&
                content.map((content: any) => (
                  <ReusableComponent content={content} key={content.id}  onDelete={()=>{setUpdate(!update); setMatiereSelectionne(0)}} role="ADMIN"/>
                ))}
            </div>
          </div>
            }
          </div>
          <div className="w-full sm:w-[20%] bg-white rounded-lg p-4 drop-shadow-sm">
            <h1 className="text-lg">Contenu pédagogique</h1>
            <div className="flex flex-col py-2">
              {content && matiereSelectionne !== 0 &&
                content.map((content: any) => (
                  <div
                    key={content.id}
                    onClick={() => ScrollIntoView(content.id)}
                    className="cursor-pointer bg-white hover:bg-slate-100 transition-colors ease-out w-full h-10 flex items-center px-2 border-y"
                  >
                    {content.title}
                  </div>
                ))}
            </div>
          </div>
        </div>
       
         
      </div>
    </>
  );
};

export default ClasseManagerProf;
