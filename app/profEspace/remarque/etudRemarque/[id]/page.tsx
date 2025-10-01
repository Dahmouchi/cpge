'use client';

import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import axios from 'axios';
import Loading from "@/components/loading";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {toast} from "react-toastify";
import { Plus,Search } from "lucide-react";
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const fetchEtudiants = async () => {
  const fetchedEtudiants = await axios.get('/api/etudiants');
  return fetchedEtudiants.data;
};
const schema = z.object({
  remarque: z.string().min(1, "La remarque est requise"),
});
const Classes = (params:any) => {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [etudiants, setEtudiants] = useState<any[]>([]);
  const [filteredEtudiants, setFilteredEtudiants] = useState<any[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<any>(); // Add this state
  const [controle ,setControle] = useState(false);
  const [sender , setSender] =useState();
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
  async function onSubmit(data: z.infer<typeof schema>) {
    setLoading(true);
    const { remarque } = data;
    const id=parseInt(selectedStudentId);
    try {
      const response = await axios.post("/api/remarks", {
        remarque:remarque,
        studentId:id,
        sender:sender,
      });

      if (response.status === 200) {
        toast.success("Vos données ont été soumises avec succès");
        const updatedEtudiants = await fetchEtudiants();
        setEtudiants(updatedEtudiants);
        setFilteredEtudiants(updatedEtudiants);
        form.setValue("remarque", "");
      } else {
        toast.error("Quelque chose s'est mal passé");
      }
    } catch (error) {
      toast.error("Quelque chose s'est mal passé");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await axios.get(`/api/professeurs/${params.params.id}`)
        setSender(res.data.user.lastName)
        setClasses(res.data.classes);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };
    getClasses();
  }, [params.params.id]);

  useEffect(() => {
    setFilteredEtudiants(
      etudiants.filter((etudiant: any) =>
        etudiant.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, etudiants]);

  const handleClassSelect = async (className: string) => {
    setSelectedClass(className);
  };

  const search =()=>{
    if(!selectedClass){
      toast.error("vous avez pas sélectionnez tous les information");
    }else{
      getInfos()
    }
    
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

 
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
                    {selectedClass ? `Classe sélectionnée: ${selectedClass}` : "Sélectionnez une classe"}
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
              </div>
              <Button onClick={()=>search()} className='bg-green-900 my-8 float-right px-5 py-2 text-white text-sm font-bold tracking-wide rounded-md focus:outline-none'> Rechercher <Search className='ml-2 '/></Button>             
            </div>
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

           <Table>
            <TableCaption>Absence des Étudiants</TableCaption>
            <TableHeader>
              <TableRow>
              <TableHead>ID</TableHead>
                <TableHead >Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead className='flex justify-end mr-6'>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEtudiants.map((etudiant:any) => (
                <TableRow key={etudiant.user.id}>
                  <TableCell>{etudiant.id}</TableCell>
                  <TableCell className="font-medium">{etudiant.user.lastName}</TableCell>
                  <TableCell>{etudiant.user.firstName}</TableCell>
                  <TableCell className='flex justify-end mr-4'>
                  <Dialog
                    onOpenChange={(isOpen) => {
                      if (isOpen) {
                        setSelectedStudentId(etudiant.id);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 text-white" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[650px]">
                      <DialogHeader>
                        <DialogTitle>Ajouter une remarque</DialogTitle>
                        <DialogDescription>
                          Veuillez entrer les informations suivantes pour inviter
                          l&apos;étudiant
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                          <FormField
                            control={form.control}
                            name="remarque"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Remarque</FormLabel>
                                <FormControl>
                                  <AutosizeTextarea {...field} id="remarque" />
                                </FormControl>
                                {form.formState.errors.remarque && (
                                  <FormMessage>
                                    {form.formState.errors.remarque.message}
                                  </FormMessage>
                                )}
                              </FormItem>
                            )}
                          />
                          
                          <div className="sm:col-span-2 flex justify-end">
                            <Button type="submit">Ajouter</Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
         </div>
        }       
      </div>
    </div>
  );
};

export default Classes;
