"use client";
import { useState, useEffect } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {toast} from "react-toastify";

import Loading from "@/components/loading";

const fetchEtudiants = async () => {
  const fetchedEtudiants = await axios.get('/api/etudiants');
  return fetchedEtudiants.data;
};

const schema = z.object({
  remarque: z.string().min(1, "La remarque est requise"),
});

const Etudiants = () => {
  const [etudiants, setEtudiants] = useState<any>([]);
  const [filteredEtudiants, setFilteredEtudiants] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<any>(); // Add this state

  useEffect(() => {
    const getInfos = async () => {
      setLoading(true);
      try {
        const fetchedEtudiants = await fetchEtudiants();
        setEtudiants(fetchedEtudiants);
        setFilteredEtudiants(fetchedEtudiants);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    getInfos();
  }, []);

  useEffect(() => {
    setFilteredEtudiants(
      etudiants.filter((etudiant: any) =>
        etudiant.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, etudiants]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    setLoading(true);
    const { remarque } = data;
    const id=parseInt(selectedStudentId);
    try {
      const response = await axios.post("/api/remarks", {
        remarque:remarque,
        studentId:id,
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10 space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row justify-between items-center">  
          <h1 className="text-lg font-semibold">Étudiants</h1>
          <div className="flex justify-end items-center">
            <Input
              type="text"
              placeholder="Rechercher par nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-44 mr-3"
            />
            <div className='bg-slate-200 p-2.5 rounded-sm'>
              <Search className="w-4 h-4"/>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto">
        <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <TableCaption>La liste des étudiants</TableCaption>
          <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <TableRow>
              <TableHead className="font-bold">Nom</TableHead>
              <TableHead className="font-bold">Prénom</TableHead>
              <TableHead className="font-bold">Email</TableHead>
              <TableHead className="font-bold">Classe</TableHead>
              <TableHead className="text-center font-bold">Nbr de remarques</TableHead>

              <TableHead className="text-right font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEtudiants.map((etudiant: any) => (
              <TableRow key={etudiant.user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <TableCell className="font-medium">
                  {etudiant.user.lastName}
                </TableCell>
                <TableCell>{etudiant.user.firstName}</TableCell>
                <TableCell>{etudiant.user.email}</TableCell>
                <TableCell>{etudiant.classId}</TableCell>
                <TableCell className="text-center">{etudiant.remarks.length}</TableCell>
                <TableCell className="text-right">
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
      </div>
    </div>
  );
};

export default Etudiants;
