"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronLeft, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import * as z from "zod";
import MultipleSelector from "@/components/ui/multiselect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Loading from "@/components/loading";
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
import ReusableComponent from "@/components/ui/v0-blocks/reusable-feed-block-remark";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const schema = z.object({
  lastName: z.string().min(1, "Nom de famille est requis"),
  firstName: z.string().min(1, "Prénom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  address: z.string().optional(),
  classes: z.array(optionSchema).min(1, "Au moins une classe est requise"),
});

const ReadUpdateProf = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<any[]>([]);
  const [absence, setAbsence] = useState<any[]>([]);
  const [update, setUpdate] = useState(false);
  const [remarque, setRemarque] = useState<any[]>([]);
  const [newModePass,setNewModPass] = useState<any>();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      lastName: "",
      firstName: "",
      phone: "",
      address: "",
      email: "",
      classes: [],
    },
  });
  const { setValue } = form;

  useEffect(() => {
    const getInfos = async () => {
      const { id } = params;
      try {
        const fetchedClasses = await axios.get("/api/classes");
        const transformedArray = fetchedClasses.data.map(
          (item: { name: any; id: any }) => ({
            label: item.name,
            value: item.id,
          })
        );
        setClasses(transformedArray);

        const fetchedProf = await axios.get(`/api/professeurs/${id}`);
        setAbsence(fetchedProf.data.absence);
        setRemarque(fetchedProf.data.remarks);

        const { data } = fetchedProf;
        setValue("lastName", data.user.lastName);
        setValue("firstName", data.user.firstName);
        setValue("phone", data.user.phone);
        setValue("address", data.user.address);
        setValue("email", data.user.email);
        setValue(
          "classes",
          data.classes.map((cls: any) => ({
            label: cls.name,
            value: cls.id,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch professor data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getInfos();
  }, [loading, update,params,setValue]);

  const onSubmit = async (data: any) => {
    try {
      await axios.put(`/api/professeurs/${params.id}`, data);
      toast.success("L'information a été mise-à-jour avec succès");
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  const handleDeleteAbsence = async (id: any) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/absence/${id}`);
      toast.success("L'absence a été supprimée avec succès");
      if (res.status === 200) {
        setUpdate(!update);
      }
    } catch (error) {
      console.error("Error deleting absence:", error);
      toast.error("Une erreur est survenue lors de la suppression");
    } finally {
      setLoading(false);
    }
  };
  const changePassword = async (password: string) => {
    try {
      // Send the password along with other student details (if needed)
      const studentData = {
        password, // only password here, you could add other fields too
      };
  
      await axios.put(`/api/professeurs/${params.id}`, studentData);
  
      toast.success("Les informations de l'étudiant ont été mises à jour avec succès");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour des informations de l'étudiant");
      console.error(error);
    }
  };
  function generatePassword(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }
  
  const generatePasswords = () => {
    setNewModPass(generatePassword()); // Make sure to call the function
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">          
          <div>
          <CardTitle>Fiche d&apos;informations</CardTitle>
            <Link href="/admin/professeurs">
              <Button variant="outline" size="icon" className="h-7 w-7 mr-2">
                <ChevronLeft className="h-4 w-4 " />
                <span className="sr-only">retour</span>
              </Button>
              Retour
            </Link>
          </div>
          <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button onClick={generatePasswords}>Générer Mot de pass</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Le nouveau mode de passe :</AlertDialogTitle>
                <AlertDialogDescription>
                  <h1 className="font-bold text-3xl">
                    {newModePass ? newModePass : "loading..."}
                  </h1>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => changePassword(newModePass)}>
                  Sauvegarder
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>           
          </div>
        </CardHeader>
        <CardContent className="flex justify-between flex-row">
          <Card className="w-1/3 mr-3">
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 w-full"
                >
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de famille</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom de famille" {...field} />
                        </FormControl>
                        <FormMessage />
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
                          <Input placeholder="Prénom" {...field} />
                        </FormControl>
                        <FormMessage />
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
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
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
                          <Input placeholder="Numéro de téléphone" {...field} />
                        </FormControl>
                        <FormMessage />
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
                          <Input placeholder="Adresse" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="classes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Classes</FormLabel>
                        <FormControl>
                          <MultipleSelector
                            placeholder="Classes"
                            options={classes}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Sauvegarder</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          {/* Absence Information Form */}
          <Card className="w-2/3">
            <CardHeader>
              <CardTitle>Informations d'absence</CardTitle>
              <h1 className="text-lg">Le nombre d'absence est {absence.length}</h1>
            </CardHeader>
            <CardContent className="flex flex-row">
              <div className="flex flex-col py-2 overflow-y-auto h-96">
                <Table>
                  <TableCaption>Absence des Professeurs</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>justification</TableHead>
                      <TableHead>La matière</TableHead>
                      <TableHead>La date</TableHead>
                      <TableHead>De - À</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {absence.map((abs) => (
                      <TableRow key={abs.id}>
                        <TableCell>{abs.type}</TableCell>
                        <TableCell>{abs.statu}</TableCell>
                        <TableCell className="text-center">{abs.statu === "justifiée" ? abs.justification : "-"}</TableCell>
                        <TableCell>{abs.subject?.name}</TableCell>
                        
                        <TableCell className="font-medium">
                          {new Date(abs.date).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          {abs.content} - {abs.contentA}
                        </TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                            <Button variant="outline"  className="ml-2">
                              <Trash className="w-4 h-4 text-red-600" />
                            </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Es-tu sûr de vouloir supprimer cette absence ?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Cette action ne peut pas être annulée.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteAbsence(abs.id)}
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
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Remarque List */}
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Les remarques</CardTitle>
            <h1 className="text-lg">Le nombre de remarques est {remarque.length}</h1>
          </CardHeader>
          <CardContent className="flex flex-row overflow-y-auto h-96">       
            <div className="flex flex-col py-2">
             {
               remarque.map((remarque) => <ReusableComponent remarque={remarque} key={remarque.id} onDelete={()=>setUpdate(!update)}/>)
             }
            </div>            
          </CardContent>
        </Card>
    </>
  );
};

export default ReadUpdateProf;
