"use client";
import { useState, useEffect } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { Card } from "@/components/ui/card";

const fetchEtudiants = async () => {
  const fetchedEtudiants = await axios.get('/api/etudiants');
  return fetchedEtudiants.data;
};

const schema = z.object({
  lastName: z.string().min(1, "Nom de famille est requis"),
  firstName: z.string().min(1, "Prénom est requis"),
  phone: z.string().min(1, "Numéro de téléphone est requis"),
  address: z.string().min(1, "Adresse est requise"),
  email: z.string().email("Email invalide"),
  studentClass: z.string().min(1, "Classe est requise"),
  avance: z.string().min(1, "L'avance doit être un nombre positif").optional(),
  totalPrice: z.string().min(1, "Le prix total doit être un nombre positif").optional(),
  group:z.string().min(1,"le group et requise")
});

const Etudiants = () => {
  const [classes, setClasses] = useState<any>([]);
  const [etudiants, setEtudiants] = useState<any>([]);
  const [filteredEtudiants, setFilteredEtudiants] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState<any[]>([]);
  const [allGroups, setAllGroups] = useState<any[]>([]);

  const [selectedGroup, setSelectedGroup] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const getInfos = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedGroup =  await axios.get("/api/groups");
        setAllGroups(fetchedGroup.data);

        const fetchedClasses = await axios.get("/api/classes");
        setClasses(fetchedClasses.data);
        

        const fetchedEtudiants = await axios.get("/api/etudiants");
        setEtudiants(fetchedEtudiants.data);
        setFilteredEtudiants(fetchedEtudiants.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false); // Stop loading
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
    setLoading(true); // Start loading
  
    // Convert string inputs to numbers, or leave them as undefined if not provided
    const { lastName, firstName, email, phone, address, studentClass,group } = data;
    const avance = data.avance ? parseFloat(data.avance) : undefined;
    const totalPrice = data.totalPrice ? parseFloat(data.totalPrice) : undefined;
  
    try {
      const response = await axios.post("/api/etudiants", {
        lastName,
        firstName,
        studentClass,
        phone,
        address,
        email,
        avance,
        totalPrice,
        group,
      });
  
      if (response.status === 201) {
        toast.success("Vos données ont été soumises avec succès");
        const updatedEtudiants = await fetchEtudiants();
        setEtudiants(updatedEtudiants);
        setFilteredEtudiants(updatedEtudiants);
      } else {
        toast.error("Quelque chose s'est mal passé");
      }
    } catch (error) {
      toast.error("Quelque chose s'est mal passé");
    } finally {
      setLoading(false); // Stop loading
    }
  }

  const handleDeleteEtudiant = async (id: any) => {
    setLoading(true); // Start loading
    try {
      await axios.delete(`/api/etudiants/${id}`);
      const updatedEtudiants = await fetchEtudiants(); // Fetch updated list
      setEtudiants(updatedEtudiants); // Update state with new data
      setFilteredEtudiants(updatedEtudiants); // Update filtered list
      toast.success("Étudiant supprimé avec succès");
    } catch (error) {
      console.error("Failed to delete student", error);
      toast.error("Erreur lors de la suppression de l'étudiant");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const handleClassChange = (classId:any) => {
    console.log("hello",classId)
    const filteredGroups = allGroups.filter((group:any) => group.classId === classId);
    setGroups(filteredGroups)
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10 space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row justify-between items-center">  
          <h1 className="text-lg font-semibold">La liste des Étudiants</h1>
          <div className="flex justify-between items-center">
          <Input
            type="text"
            placeholder="Rechercher par nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-44 mr-3"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-emerald-800 hover:bg-emerald-700 float-right">
                Ajouter un étudiant
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[650px]">
              <DialogHeader>
                <DialogTitle>Ajouter un étudiant</DialogTitle>
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de famille</FormLabel>
                        <FormControl>
                          <Input {...field} id="lastName" />
                        </FormControl>
                        {form.formState.errors.lastName && (
                          <FormMessage>
                            {form.formState.errors.lastName.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input {...field} id="firstName" />
                        </FormControl>
                        {form.formState.errors.firstName && (
                          <FormMessage>
                            {form.formState.errors.firstName.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} id="email" />
                        </FormControl>
                        {form.formState.errors.email && (
                          <FormMessage>
                            {form.formState.errors.email.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de téléphone</FormLabel>
                        <FormControl>
                          <Input {...field} id="phone" />
                        </FormControl>
                        {form.formState.errors.phone && (
                          <FormMessage>
                            {form.formState.errors.phone.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input {...field} id="address" />
                        </FormControl>
                        {form.formState.errors.address && (
                          <FormMessage>
                            {form.formState.errors.address.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="studentClass"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Classe</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleClassChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez une classe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {classes.map((item: any) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.studentClass && (
                          <FormMessage>
                            {form.formState.errors.studentClass.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="totalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prix ​​convenu</FormLabel>
                        <FormControl>
                          <Input {...field} id="totalPrice" />
                        </FormControl>
                        {form.formState.errors.totalPrice && (
                          <FormMessage>
                            {form.formState.errors.totalPrice.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="group"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Groupe</FormLabel>
                        <FormControl>

                        <select
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="input flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                        >
                          <option value="">Séléctionnez un groupe</option>
                          {groups.map((item) => (
                            <option key={item.id} value={item.id.toString()}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        </FormControl>
                        {form.formState.errors.group && (
                          <FormMessage>
                            {form.formState.errors.group.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  /> 
                  <FormField
                    control={form.control}
                    name="avance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Montant de l'avance</FormLabel>
                        <FormControl>
                          <Input {...field} id="avance" />
                        </FormControl>
                        {form.formState.errors.avance && (
                          <FormMessage>
                            {form.formState.errors.avance.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <div className="sm:col-span-2">
                    <Button type="submit">Ajouter</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          </div>
        </div>
        <Card className="p-3">
        <Table>
          <TableCaption>La liste des étudiants</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Prénom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Classe</TableHead>
              <TableHead>Numéro de téléphone</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEtudiants.map((etudiant: any) => (
              <TableRow key={etudiant.user.id}>
                <TableCell className="font-medium">
                  {etudiant.user.lastName}
                </TableCell>
                <TableCell>{etudiant.user.firstName}</TableCell>
                <TableCell>{etudiant.user.email}</TableCell>
                <TableCell>{etudiant.classId}</TableCell>
                <TableCell>{etudiant.user.phone}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/etudiants/${etudiant.user.id}`}>
                    <Button variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="ml-2">
                        <Trash className="w-4 h-4 text-red-600" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûrs?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteEtudiant(etudiant.user.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Continuer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Card>
      </div>
    </div>
  );
};

export default Etudiants;
