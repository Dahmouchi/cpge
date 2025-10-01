"use client";

import Loading from "@/components/loading";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, CircleCheckBig } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import * as z from "zod";

import { toast } from "react-toastify";
import { Separator } from "@/components/ui/separator";

const schema = z.object({
  remarque: z.string().min(1, "La remarque est requise"),
});

export default function FormPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [update,setUpdate]=useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/form');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [update]);
  async function onSubmit(formId: number) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/form", { formId });
      if (response.status === 200) {
        toast.info("Marquer comme contacté")
        setUpdate(!update)
      } else {
        setError("Failed to update form status.");
      }
    } catch (err) {
      setError("An error occurred while updating the form status.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto py-10 space-y-4">
      <h1 className="text-lg font-semibold">Demandes de pré-inscription</h1>
      <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <TableCaption>La liste des étudiants</TableCaption>
          <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <TableRow>
            <TableHead className="font-bold">Statu</TableHead>
              <TableHead className="font-bold">Nom</TableHead>
              <TableHead className="font-bold">Prénom</TableHead>
              <TableHead className="font-bold">Email</TableHead>
              <TableHead className="text-center font-bold">Phone</TableHead>

              <TableHead className="text-right font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((etudiant: any) => (
              <TableRow key={etudiant.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <TableCell>{etudiant.status}</TableCell>
                <TableCell className="font-medium">
                  {etudiant.lastName}
                </TableCell>
                <TableCell>{etudiant.firstName}</TableCell>
                <TableCell>{etudiant.email}</TableCell>
                <TableCell className="text-center">{etudiant.phone}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button  className={`${etudiant.status === "contacted" && "bg-green-600"}`}>
                        <CircleCheckBig className={`w-4 h-4 text-white`} />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                      <DialogTitle>Fiche de pré-inscription</DialogTitle>
                      <DialogDescription>
                        Voici la fiche d&apos;information des utilisateurs qui ont
                        rempli le formulaire
                      </DialogDescription>
                    </DialogHeader>
                      <div>
                      <div className="flex flex-col space-y-4">
                        <div className="">Nom</div>
                        <div className="font-semibold">{etudiant.lastName}</div>
                        <Separator />
                        <div>Prénom</div>
                        <div className="font-semibold">{etudiant.firstName}</div>
                        <Separator />
                        <div>E-mail</div>
                        <div className="font-semibold">{etudiant.email}</div>
                        <Separator />
                        <div>Numéro de téléphone</div>
                        <div className="font-semibold">{etudiant.phone}</div>
                        <Separator />
                      </div>
                      <div className="flex flex-row justify-end mt-2">
                      {etudiant.status === "pending" ? (
                        <Button
                          onClick={() => onSubmit(etudiant.id)}
                          className="w-fit bg-green-700 hover:bg-green-600"
                          disabled={loading}
                        >
                          {loading ? "En cours..." : "Marquer comme contacté"}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => onSubmit(etudiant.id)}
                          className="w-fit bg-red-700 hover:bg-red-600"
                          disabled={loading}
                        >
                          {loading ? "En cours..." : "Marquer comme non contacté"}
                        </Button>
                      )}</div>
                      {error && <p className="text-red-500">{error}</p>}
                    </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}
