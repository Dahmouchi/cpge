"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import ReusableComponent from "@/components/ui/v0-blocks/reusable-feed-block-news";
import Loading from "@/components/loading";

const ClasseManagerProf = ({ params }: { params: { id: string } }) => {
  const [update, setUpdate] = useState(false);
  const [theClass, setTheClass] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [news,setNews] = useState<any>();
  useEffect(() => {
    const getInfos = async () => {
      setLoading(true);
      try {
        const ress = await axios.get(`/api/etudiants/${params.id}`)  
        setTheClass(ress.data.class)
        if(ress){
            const res = await axios.get(`/api/admin/news/${ress.data.classId}`)
             setNews(res.data)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getInfos();
  }, [params.id,update]);

  

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
      <div className="flex flex-col z-50">
      <h1 className="text-4xl font-semibold mb-3">La classe {theClass?.name}</h1>
      <div className="bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2 mt-5">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-2xl font-semibold mb-4">Les Nouvelles Publications</h1>
              <h1 className="text-lg font-semibold mb-4">Découvrez les dernières actualités et événements de la classe {theClass?.name}</h1>
            </div>  
          </div>   
          </div>
          
          <div className="w-full flex flex-col-reverse sm:flex-row justify-between ">
          <div className="w-full sm:w-[80%] bg-white rounded-lg p-4 drop-shadow-sm flex flex-col space-y-2 overflow-y-auto h-96">

          <div className="bg-white border-lg p-4 space-y-2 border ">
              <h1 className="text-lg font-semibold">Dernières publications</h1>
              <div className="flex flex-col ">
                {news &&
                  news.map((news: any) => (
                    <div key={news.id}>
                     <ReusableComponent matieres={news} key={news.id} onDelete={()=>setUpdate(!update)} role="ETUDIANT"/>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          
          <div className="w-full sm:w-[20%] bg-white rounded-lg p-4 drop-shadow-sm">
            <h1 className="text-lg font-semibold">Les publication</h1>
            <div className="flex flex-col py-2">
              {news &&
                news.map((news: any) => (
                  <div
                    key={news.id}
                    onClick={() => ScrollIntoView(news.id)}
                    className="cursor-pointer bg-white hover:bg-slate-100 transition-colors ease-out w-full h-10 flex items-center px-2 border-y"
                  >
                    {news.title}
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
