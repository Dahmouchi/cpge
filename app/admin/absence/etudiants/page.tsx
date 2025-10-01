'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
import { Search,CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import axios from 'axios';
import Loading from "@/components/loading";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {toast} from "react-toastify";
const hourList = [
  { "id": 1, "time": "08:00" },
  { "id": 2, "time": "08:30" },
  { "id": 3, "time": "09:00" },
  { "id": 4, "time": "09:30" },
  { "id": 5, "time": "10:00" },
  { "id": 6, "time": "10:30" },
  { "id": 7, "time": "11:00" },
  { "id": 8, "time": "11:30" },
  { "id": 9, "time": "12:00" },
  { "id": 10, "time": "12:30" },
  { "id": 11, "time": "13:00" },
  { "id": 12, "time": "13:30" },
  { "id": 13, "time": "14:00" },
  { "id": 14, "time": "14:30" },
  { "id": 15, "time": "15:00" },
  { "id": 16, "time": "15:30" },
  { "id": 17, "time": "16:00" },
  { "id": 18, "time": "16:30" },
  { "id": 19, "time": "17:00" },
  { "id": 20, "time": "17:30" },
  { "id": 21, "time": "18:00" },
  { "id": 22, "time": "18:30" }
];

const typeList=[
  {"id": 1, "type":"Absence"},
  {"id": 1, "type":"Retard"},
]
const statuList=[
  {"id": 1, "type":"Non justifiée"},
  {"id": 1, "type":"justifiée"},
]
const Classes = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [etudiants, setEtudiants] = useState<any[]>([]);
  const [matieres, setMatieres] = useState<any[]>([]);
  const [selectMatiere, setSelectMatiere]  = useState<any>();
  const [filteredEtudiants, setFilteredEtudiants] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [controle, setControle] = useState(false);
  const [hour, setHour] = useState();
  const [hourA, setHourA] = useState();
  const [type, setType] = useState();
  const [statu, setStatu] = useState();
  const [justifications, setJustifications] = useState<{ [key: number]: string }>({}); // New state


  const getInfos = async () => {
    setLoading(true); // Start loading
    try {
      const fetchedEtudiants = await axios.get(`/api/etudiants/classes/${selectedClass}`);
      setEtudiants(fetchedEtudiants.data);
      setFilteredEtudiants(fetchedEtudiants.data);
      setControle(true)
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await axios.get('/api/classes');
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };
    getClasses();
  }, []);

  useEffect(() => {
    setFilteredEtudiants(
      etudiants.filter((etudiant: any) =>
        etudiant.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, etudiants]);

  const handleClassSelect = async (className: string) => {
    setSelectedClass(className);
    try{
      const res = await axios.get(`/api/admin/courses/${className}`)
      setMatieres(res.data)
    }catch(err){
      toast.error("vous avez pas sélectionnez tous les information");
    }
  };
  const handleJustificationChange = (studentId: number, value: string) => {
    setJustifications((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };
  const handleMatiere = (matier:any) => {
    setSelectMatiere(matier);
  };
  const handleHour = (matier:any) => {
    setHour(matier);
  };
  const handleHourA = (matier:any) => {
    setHourA(matier);
  };
  const handleStatu = (matier:any) => {
    setStatu(matier);
  };
  const handleType = (matier:any) => {
    setType(matier);
  };
  const search =()=>{
    if(!selectedClass || !selectMatiere ||!selectedDate){
      toast.error("vous avez pas sélectionnez tous les information");
    }else{
      getInfos()
    }
    
  }
  const handleStudentSelect = (studentId: number) => {
    setFilteredEtudiants((prev) =>
      prev.map((etudiant:any) =>
        etudiant.user.id === studentId ? { ...etudiant, selected: !etudiant.selected } : etudiant
      )
    );
  };

  const submitAbsence = async () => {
    setLoading(true);
    const selectedStudents = filteredEtudiants.filter((etudiant:any) => etudiant.selected);
    const absencePromises = selectedStudents.map((student:any) =>
      axios.post('/api/absence', {
        date: selectedDate ? selectedDate.toISOString() : '',
        classId: selectedClass,
        subjectId: selectMatiere.id,
        content: hour,
        contentA: hourA,
        type: type,
        studentId: student.id,
        statu: statu,
        justification: justifications[student.user.id], // Include justification
      })
    );

    try {
      await Promise.all(absencePromises);
      toast.success('Absence data saved successfully');
      setControle(!controle);
      // Reset form or handle success
    } catch (error) {
      console.error('Failed to save absence data', error);
      toast.error('Failed to save absence data');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-2 space-y-4">
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
                    {type ? ` ${type}` : "Type"}
                    <ChevronDown className='ml-2' />
                  </Button>
                </DropdownMenuTrigger>
              <DropdownMenuContent>
                  <DropdownMenuLabel>Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {typeList.map((cls:any) => (
                      <DropdownMenuItem key={cls.id} onClick={() => handleType(cls.type)}>
                        {cls.type}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
              <div className='ml-2'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    {selectedClass ? `${selectedClass}` : "Sélectionnez une classe"}
                    <ChevronDown className='ml-2' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Sélectionnez une classe</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {classes.map((cls:any) => (
                      <DropdownMenuItem key={cls.id} onClick={() => handleClassSelect(cls.name)}>
                        {cls.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
              <div className='ml-2'>
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button>
                    {selectMatiere ? ` ${selectMatiere.name}` : "Sélectionnez la matiére"}
                    <ChevronDown className='ml-2' />
                  </Button>
                </DropdownMenuTrigger>
              <DropdownMenuContent>
                  <DropdownMenuLabel>la matiére</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {matieres.map((cls:any) => (
                      <DropdownMenuItem key={cls.id} onClick={() => handleMatiere(cls)}>
                        {cls.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
              <div className='ml-2'>
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => {
                  if (date) {
                    setSelectedDate(date);
                  }
                }}
                className="w-44 bg-slate-900 text-white p-2 rounded-md"
                dateFormat="yyyy-MM-dd"    
              />
              </div>
              <div className='ml-2'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    {hour ? ` ${hour}` : "De"}
                    <ChevronDown className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-60 overflow-auto">
                  <DropdownMenuLabel>De</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {hourList.map((cls) => (
                      <DropdownMenuItem key={cls.id} onClick={() => handleHour(cls.time)}>
                        {cls.time}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              </div>
              <div className='ml-2'>
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button>
                    {hourA ? ` ${hourA}` : "À"}
                    <ChevronDown className='ml-2' />
                  </Button>
                </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-60 overflow-auto">
                  <DropdownMenuLabel>À</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {hourList.map((cls) => (
                      <DropdownMenuItem key={cls.id} onClick={() => handleHourA(cls.time)}>
                        {cls.time}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
              <div className='ml-2'>
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button>
                    {statu ? ` ${statu}` : "Statu"}
                    <ChevronDown className='ml-2' />
                  </Button>
                </DropdownMenuTrigger>
              <DropdownMenuContent>
                  <DropdownMenuLabel>Statu</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {statuList.map((cls) => (
                      <DropdownMenuItem key={cls.id} onClick={() => handleStatu(cls.type)}>
                        {cls.type}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
              </div>
              <Button onClick={()=>search()} className='bg-green-900 my-8 ml-3 float-right px-5 py-2 text-white text-sm font-bold tracking-wide rounded-md focus:outline-none'> Rechercher <Search className='ml-2 '/></Button>
              
            </div>
            {controle && 
              <div className='flex justify-end w-full'>
              <Button onClick={submitAbsence} >Enregistrer l'absence</Button>
            </div>}
          </Card>
      </div>
      <div className="mt-6">
        {controle && 
         <div className="flex flex-col space-y-4">
           <div className="flex flex-row justify-between items-center">  
             <h1 className="text-lg font-semibold">Étudiants de la classe {selectedClass}</h1>
             <div className="flex justify-between items-center">
               <div className="ml-4">
                 <Input
                   type="text"
                   placeholder="Rechercher"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
             </div>
           </div>
          <Card >
           <Table>
            <TableCaption>Absence des Étudiants</TableCaption>
            <TableHeader>
              <TableRow>
              <TableHead>ID</TableHead>
                <TableHead >Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Statut</TableHead>
                {statu === "justifiée" && <TableHead>Justification</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEtudiants.map((etudiant) => (
                <TableRow key={etudiant.user.id}>
                  <TableCell>{etudiant.id}</TableCell>
                  <TableCell className="font-medium">{etudiant.user.lastName}</TableCell>
                  <TableCell>{etudiant.user.firstName}</TableCell>
                  <TableCell>
                    <Input
                      type="checkbox"
                      checked={etudiant.selected || false}
                      onChange={() => handleStudentSelect(etudiant.user.id)}
                      className='w-7 h-7'
                    />
                  </TableCell>
                  {statu === "justifiée" && 
                   <TableCell>
                    <Input
                      type="text"
                      placeholder="Justification"
                      value={justifications[etudiant.user.id] || ''}
                      onChange={(e) => handleJustificationChange(etudiant.user.id, e.target.value)}
                    />
                  </TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Card>
         </div>
        }
        
      </div>
    </div>
  );
};

export default Classes;
