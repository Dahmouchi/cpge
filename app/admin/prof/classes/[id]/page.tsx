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
import { useState, useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import AddCoursTab from "./_components/content";
import ReusableComponent from "@/components/ui/v0-blocks/reusable-feed-block";
import DropdownBtn from "@/components/ui/dropdown-btn";
import Link from "next/link";
import Loading from "@/components/loading";

const ClasseManagerProf = ({ params }: { params: { id: string } }) => {
  const classId = params.id.toString();
  const [isLoading, setIsLoading] = useState(false);
  const [matiereSelectionne, setMatiereSelectionne] = useState(0);
  const [matieres, setMatieres] = useState<any>();
  const [content, setContent] = useState<any>();
  const [update, setUpdate] = useState(false);



  const addMatiere = async (formData: FormData) => {
    setIsLoading(true);
    const response = await axios.post(`/api/prof/classes/${classId}`, {
      name: formData.get("matiereName")?.toString(),
      description: formData.get("matiereDescription")?.toString(),
    });
    setIsLoading(false);
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
    const getData = async () => {
      const response = await axios.get(`/api/prof/classes/${classId}`);
      setMatieres(response.data);
      if (matiereSelectionne) {
        setMatiereContent(matiereSelectionne);
      }
    };
    getData();
  }, [update,classId]);

  const setMatiereContent = async (id: number) => {
    setMatiereSelectionne(id);
    const contenu = matieres.find((matiere: any) => matiere.id === id);
    setContent(contenu.contents);
  };

  if(isLoading){
    return <Loading />
  }
  return (
    <>
      <div className="flex flex-col">
        <div className="bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-semibold">{params.id}</h1>
              <h1 className="text-lg font-semibold">Tableau des matières</h1>
              <h2>
                Ici, vous pouvez gérer le contenu pédagogique pour les étudiants
              </h2>
            </div>
            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Ajouter une matière</Button>
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
                    <Button disabled={isLoading} type="submit">
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
                onItemClick={() => setMatiereContent(matiere.id)}
              >
                {matiere.name}
              </DropdownBtn>
            ))}
          </div>
          <h1 className="text-sm text-gray-600">
            Veuillez cliquer sur une matière pour afficher le contenu approprié.
          </h1>
        </div>
        <div className="w-full flex flex-col-reverse sm:flex-row justify-between space-x-4">
          <div className="w-full sm:w-[80%] bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2">
            <AddCoursTab
              onAddContent={() => setUpdate(!update)}
              id={matiereSelectionne}
            />
            <div className="bg-white border-lg p-4 space-y-2 border">
              <h1>Dernières publications</h1>
              <div className="flex flex-col">
                {content &&
                  content.map((content: any) => (
                    <ReusableComponent
                      content={content}
                      key={content.id}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full sm:w-[20%] bg-white rounded-lg p-4 drop-shadow-sm">
            <h1 className="text-lg">Contenu pédagogique</h1>
            <div className="flex flex-col py-2">
              {content &&
                content.map((content: any) => (
                  <div key={content.id} onClick={() => ScrollIntoView(content.id)} className="cursor-pointer bg-white hover:bg-slate-100 transition-colors ease-out w-full h-10 flex items-center px-2 border-y">
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
