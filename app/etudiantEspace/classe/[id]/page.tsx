"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import ReusableComponent from "@/components/ui/v0-blocks/reusable-feed-block";
import DropdownBtn from "@/components/ui/dropdown-btn";
import Loading from "@/components/loading";
import EmploiTab from "@/components/emploiTab";


const ClasseManagerProf = ({ params }: { params: { id: string } }) => {
  const [matiereSelectionne, setMatiereSelectionne] = useState(0);
  const [matieres, setMatieres] = useState<any>();
  const [content, setContent] = useState<any>();
  const [update, setUpdate] = useState(false);
  const [theClass, setTheClass] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [emploi,setEmploi] = useState<any>();
  const [prof,setProf] = useState<any>();


  useEffect(() => {
    const getInfos = async () => {
      setLoading(true);
      try {
        const ress = await axios.get(`/api/etudiants/${params.id}`)  
        setTheClass(ress.data.class)
        if(ress){
            const res = await axios.get(`/api/admin/emplois/${ress.data.classId}`)
            setEmploi(res.data)
            const response = await axios.get(`/api/admin/courses/${ress.data.classId}`);
            setMatieres(response.data);
          if (matiereSelectionne) {
            setMatiereContent(matiereSelectionne);
          }    
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getInfos();
  }, [update, matiereSelectionne, params.id]);

  const setMatiereContent = async (id: number) => {
    setMatiereSelectionne(id);
    const contenu = matieres.find((matiere: any) => matiere.id === id);
    setContent(contenu.contents);
    setProf(contenu.teachers[0].user.firstName)
  };
  const ScrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
      <h1 className="text-4xl font-semibold mb-3">La classe {theClass?.name}</h1>
      <div className="bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2 mt-5">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-2xl font-semibold mb-4">les emplois de temp</h1>
              <h1 className="text-lg font-semibold mb-4">Ici, vous pouvez voir un emploi de temp pour la classe {theClass?.name}</h1>
            </div>  
          </div>   
          </div>
          <div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mb-3">
            {emploi?.map((matiere: any) => (
              <div className="basis-1/4"  key={matiere.id}>
                <EmploiTab
                  key={matiere.id}
                  emploi={matiere}
                  onItemClick={() => {setUpdate(!update)}}
                  role="ETUDIANT"
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
                Cours pour {theClass?.name}
              </h1>
              <h2>
                Ici, vous trouver le contenu pédagogique pour les étudiants
              </h2>
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
                role="ETUDIANT"
              >
                {matiere.name}
              </DropdownBtn>
            ))}
          </div>
          <h1 className="text-sm text-gray-600">
            Veuillez cliquer sur une matière pour afficher le contenu approprié.
          </h1>
        </div>
        <div className="w-full flex flex-col-reverse sm:flex-row lg:justify-between ">
          <div className="bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2 overflow-y-auto h-96 w-full">
            {matiereSelectionne !== 0 &&
            <div className="bg-white border-lg p-4 space-y-2 border ">
            <h1>Dernières publications</h1>
            <h3>Professeur : {prof}</h3>
            <div className="flex flex-col">
              {content &&
                content.map((content: any) => (
                  <ReusableComponent content={content} key={content.id} onDelete={()=>setUpdate(!update)}/>
                ))}
            </div>
          </div>
            }
          </div>
          <div className="w-full lg:w-1/3 bg-white lg:rounded-lg p-4 drop-shadow-sm">
            <h1 className="text-lg font-bold">Contenu pédagogique</h1>
            <div className="flex flex-col py-2">
              {content &&
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
