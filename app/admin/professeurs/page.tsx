"use client";
import { useState, useEffect, ChangeEvent } from "react";
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
import {  Trash, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import MultipleSelector from "@/components/ui/multiselect";
import type { Option } from "@/components/ui/multiselect";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
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
import Loading from "@/components/loading";
import { Card } from "@/components/ui/card";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const schema = z.object({
  lastName: z.string().min(1, "Nom de famille est requis"),
  firstName: z.string().min(1, "Prénom est requis"),
  email: z.string().email("Email invalide"),
  classes: z.array(optionSchema).min(1, "Au moins une classe est requise"),
  phone: z.string().min(1, "Numéro de téléphone est requis"),
  adress: z.string().min(1, "l'adress est requis"),
});

type Professeur = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    statut: boolean;
    adress:string;
  };
};

const Professeurs = () => {
  const [classes, setClasses] = useState<Option[]>([]);
  const [professeurs, setProfesseurs] = useState<Professeur[]>([]);
  const [filteredProfesseurs, setFilteredProfesseurs] = useState<Professeur[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getInfos = async () => {
      setLoading(true);
      try {
        const fetchedClasses = await axios.get("/api/classes");
        const transformedArray = fetchedClasses.data.map(
          (item: { name: string; id: string }) => ({
            label: item.name,
            value: item.id,
          })
        );
        setClasses(transformedArray);

        const fetchedProfesseurs = await axios.get('/api/professeurs');
        setProfesseurs(fetchedProfesseurs.data);
        setFilteredProfesseurs(fetchedProfesseurs.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getInfos();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredProfesseurs(
        professeurs.filter(professeur =>
          professeur.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          professeur.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProfesseurs(professeurs);
    }
  }, [searchTerm, professeurs]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true);
    try {
      const { lastName, firstName, email, classes, phone,adress } = data;
      const response = await axios.post("/api/professeurs", {
        lastName,
        firstName,
        email,
        classes,
        phone,
        adress,
      });

      if (response.status === 201) {
        toast.success("Vos données ont été soumises avec succès");
        const fetchedProfesseurs = await axios.get('/api/professeurs').then(res => res.data);
        setProfesseurs(fetchedProfesseurs);
        setFilteredProfesseurs(fetchedProfesseurs);
      } else {
        toast.error("Quelque chose s'est mal passé");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Une erreur est survenue lors de la soumission des données");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfesseur = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`/api/professeurs/${id}`);
      const fetchedProfesseurs = await axios.get('/api/professeurs').then(res => res.data);
      setProfesseurs(fetchedProfesseurs);
      setFilteredProfesseurs(fetchedProfesseurs);
    } catch (error) {
      console.error("Error deleting professeur:", error);
      toast.error("Une erreur est survenue lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10 space-y-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg font-semibold">La liste des Professeurs</h1>
        <div className="flex justify-between items-center">
        <div className="mr-5">
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button  className="bg-emerald-800 hover:bg-emerald-700 float-right">Ajouter un professeur</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl sm:max-w-2xl md:max-w-3xl lg:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Ajouter un professeur</DialogTitle>
              <DialogDescription>
                Veuillez entrer les informations suivantes pour ajouter le professeur
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de famille</FormLabel>
                      <FormControl>
                        <Input {...field} id="lastName" />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.lastName?.message}
                      </FormMessage>
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
                      <FormMessage>
                        {form.formState.errors.firstName?.message}
                      </FormMessage>
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
                      <FormMessage>
                        {form.formState.errors.email?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input {...field} id="phone" />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.phone?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="adress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adress</FormLabel>
                      <FormControl>
                        <Input {...field} id="adress" />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.adress?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="classes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Classe</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          {...field}
                          defaultOptions={classes}
                          placeholder="Sélectionnez les classes..."
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              Aucune option trouvée.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.classes?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Button type="submit">Ajouter</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        </div>
      </div>
      <Card className="p-3">
      <Table>
        <TableCaption>La liste des professeurs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Numéro de téléphone</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProfesseurs.map((professeur) => (
            <TableRow key={professeur.user.id}>
              <TableCell className="font-medium">
                {professeur.user.firstName}
              </TableCell>
              <TableCell>{professeur.user.lastName}</TableCell>
              <TableCell>{professeur.user.email}</TableCell>
              <TableCell>{professeur.user.phone}</TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/professeurs/${professeur.user.id}`}>
                  <Button variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline"  className="ml-2">
                      <Trash className="w-4 h-4 text-red-600" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteProfesseur(professeur.user.id)}
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
  );
};

export default Professeurs;
