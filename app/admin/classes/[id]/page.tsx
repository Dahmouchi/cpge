"use client";
import { useState, useEffect } from "react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Trash } from "lucide-react";
import axios from "axios";


import Loading from "@/components/loading";
import { Card } from "@/components/ui/card";
import Link from "next/link";


const Etudiants = ({ params }: { params: { id: string } }) => {
  const [etudiants, setEtudiants] = useState<any>([]);
  const [filteredEtudiants, setFilteredEtudiants] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getInfos = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedEtudiants = await axios.get(`/api/etudiants/classes/${params.id}`);
        setEtudiants(fetchedEtudiants.data);
        setFilteredEtudiants(fetchedEtudiants.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    getInfos();
  }, [params.id]);

  useEffect(() => {
    setFilteredEtudiants(
      etudiants.filter((etudiant: any) =>
        etudiant.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, etudiants]);

  

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10 space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row justify-between items-center">  
          <h1 className="text-lg font-semibold">Étudiants de la classe {params.id}</h1>
          <div className="flex justify-between items-center">
          <Input
            type="text"
            placeholder="Rechercher par nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-44 mr-3"
          />
          
          </div>
        </div>
        <Link href="/admin/classes">
            <div className="inline-flex items-center space-x-2 text-blue-600 hover:underline">
              <ChevronLeft className="h-4 w-4" />
              <span>Retour</span>
            </div>
          </Link>
        <Card>
        <Table>
          <TableCaption>La liste des étudiants dans la classe {params.id}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Prénom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Classe</TableHead>
              <TableHead>Numéro de téléphone</TableHead>
              <TableHead>Groupe</TableHead>
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
                <TableCell>{etudiant.class.description}</TableCell>
                <TableCell>{etudiant.user.phone}</TableCell>
                <TableCell>{etudiant.group?.name}</TableCell>
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
