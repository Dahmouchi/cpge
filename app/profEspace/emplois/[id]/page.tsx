"use client"
import {useEffect,useState} from 'react'
import toast from 'react-hot-toast';
import Loading from '@/components/loading';
import axios from 'axios';
import EmploiTab from "@/components/emploiTab";
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Page = (params:any) => {
    const [emploi,setEmploi] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true)
          try {
            const studentResponse = await axios.get(`/api/professeurs/${params.params.id}`);
            setEmploi(studentResponse.data.emploi);
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
            <h1 className="text-2xl font-semibold mb-4">Votre Emplois de temps</h1>
            <h1 className="text-lg font-semibold mb-2">Ici vous pouvez ouvrir et télécharger les emplois de temps </h1>

            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
    </div>
  )
}

export default Page