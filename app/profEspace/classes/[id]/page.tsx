"use client"
import { Card } from '@/components/ui/card';
import axios from 'axios';
import {useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import { ChevronDown } from "lucide-react";
import { Search,CalendarDays } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Loading from '@/components/loading';
const ClassesPG = (params:any) => {
  const [studentData, setStudentData] = useState<any>(null);
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filteredEtudiants, setFilteredEtudiants] = useState<any[]>([]);

  const getInfos = async () => {
    setLoading(true); // Start loading
    try {
      const fetchedEtudiants = await axios.get(`/api/etudiants/classes/${selectedClass}`);
      setFilteredEtudiants(fetchedEtudiants.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get(`/api/professeurs/${params.params.id}`);
        setStudentData(studentResponse.data);
        setClasses(studentResponse.data.classes);
      } catch (error) {
        toast.error("Une erreur est survenue lors du chargement des données.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.params.id,loading]);
  const handleClassSelect = async (className: string) => {
    setSelectedClass(className);
    
  };

  const search =()=>{
    if(!selectedClass ){
      toast.error("vous avez pas sélectionnez tous les information");
    }else{
      setFilteredEtudiants([])
      getInfos()
    }
    
  }
  if(loading){
    return <Loading />
  }
  return (
    <div className="sticky top-0  z-10 space-y-2 pb-2">
        <Card className='w-full bg-white rounded-lg p-4 drop-shadow-sm'>
        <div>
          <h1 className="text-2xl font-semibold mb-4">La gestion d'absence pour les étudiants</h1>
          <h1 className="text-lg font-semibold mb-2">Ici, vous pouvez sélectionnez la classe et les informations</h1>
        </div>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex justify-center items-center'>
            <div className='ml-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  {selectedClass ? `Classe sélectionnée: ${selectedClass}` : "Sélectionnez une classe"}
                  <ChevronDown className='ml-2' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sélectionnez une classe</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {classes.map((cls:any) => (
                    <DropdownMenuItem key={cls.id} onClick={() => handleClassSelect(cls.name) }>
                      {cls.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>      
            </div>
            <Button onClick={()=>search()} className='bg-green-900 my-8 float-right px-5 py-2 text-white text-sm font-bold tracking-wide rounded-md focus:outline-none'> Rechercher <Search className='ml-2 '/></Button>           
          </div>
          <Table>
            <TableCaption>Absence des Étudiants</TableCaption>
            <TableHeader>
              <TableRow>
              <TableHead>ID</TableHead>
                <TableHead >Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Email</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEtudiants.map((etudiant:any) => (
                <TableRow key={etudiant.user.id}>
                  <TableCell>{etudiant.id}</TableCell>
                  <TableCell className="font-medium">{etudiant.user.lastName}</TableCell>
                  <TableCell>{etudiant.user.firstName}</TableCell>
                  <TableCell>{etudiant.user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
    </div>
  )
}

export default ClassesPG