"use client"
import {useEffect,useState} from 'react'
import toast from 'react-hot-toast';
import Loading from '@/components/loading';
import axios from 'axios';
import ReusableComponent from "@/components/ui/v0-blocks/reusable-feed-block-news";
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Page = (params:any) => {
    const [news,setNews] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
        setLoading(true)
          try {
            const studentResponse = await axios.get(`/api/professeurs/${params.params.id}`);
            setNews(studentResponse.data.news);
            setLoading(false)
          } catch (error) {
            toast.error("Une erreur est survenue lors du chargement des données.");
            setLoading(false)

            console.error(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [params.params.id]);

  if(loading){
    return <Loading />
  }
  return (
    <div>
        <Card>
            <CardHeader>
            <h1 className="text-2xl font-semibold mb-4">Votre nouvelles</h1>
            <h1 className="text-lg font-semibold mb-2">Ici vous pouvez ouvrir et installer les nouvelle est le dérinieres publication</h1>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col ">
                {news.map((matiere: any) => (
                <div key={matiere.id}>
                  <ReusableComponent matieres={matiere} key={news.id} onDelete={()=>setUpdate(!update)} role="PROF"/>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default Page