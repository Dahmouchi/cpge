"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import ReusableComponent from "@/components/ui/v0-blocks/reusable-feed-block";
import DropdownBtn from "@/components/ui/dropdown-btn";
import Loading from "@/components/loading";
import EmploiTab from "@/components/emploiTab";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";

const ClasseManagerProf = ({ params }: { params: { id: string } }) => {
  const [update, setUpdate] = useState(false);
  const [theClass, setTheClass] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [emploi,setEmploi] = useState<any>();

  useEffect(() => {
    const getInfos = async () => {
      setLoading(true);
      try {
        const ress = await axios.get(`/api/parents/${params.id}`);
        setTheClass(ress.data.student.classId)
        if(ress){    
            const res = await axios.get(`/api/admin/emplois/${ress.data.student.classId}`)
            setEmploi(res.data)            
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getInfos();
  }, [params.id,update]);

  if(loading){
    return <Loading />
  }
  return (
    <>
      <div className="flex flex-col">
      <h1 className="text-4xl font-semibold mb-3">La classe {theClass}</h1>
      <div className="bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2 mt-5">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-2xl font-semibold mb-4">les emplois de temp</h1>
              <h1 className="text-lg font-semibold mb-4">Ici, vous pouvez voir un emploi de temp pour la classe {theClass}</h1>
            </div>  
          </div>   
          </div>
          <div>
          <div className="w-full flex space-x-2 flex-wrap mb-3">
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
      </div>
    </>
  );
};

export default ClasseManagerProf;
