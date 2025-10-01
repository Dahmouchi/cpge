"use client";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Loading from "@/components/loading";
import Item from "./_components/items";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import profile from "@/public/profProfile.jpg";
import { logout } from "@/actions/signout";

const HomeAdmin = (user:any) => {
  const [cl, setClas] = useState(0);
  const [etud, setEtud] = useState(0);
  const [prof, setProf] = useState(0);
  const [forms, setForms] = useState(0);
  const [filteredEtudiants, setFilteredEtudiants] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = useCallback(async () => {
    try {
      const [classesResponse, etudiantsResponse, profsResponse, formsResponse] = await Promise.all([
        axios.get('/api/classes'),
        axios.get('/api/etudiants'),
        axios.get('/api/professeurs'),
        axios.get('/api/form'),
      ]);

      setClas(classesResponse.data.length);
      setFilteredEtudiants(etudiantsResponse.data);
      setEtud(etudiantsResponse.data.length);
      setProf(profsResponse.data.length);
      setProfesseurs(profsResponse.data);
      setForms(formsResponse.data.length);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="grid grid-cols-4 gap-8">
        <Item number={etud} type="Nombre total d'étudiants" img="/client.gif" />
        <Item number={prof} type="Nombre total des Professeurs" img="/diagramme.gif" />
        <Item number={cl} type="Nombre total des Classes" img="/lecole.gif" />
        <Item number={forms} type="Nombre total des Préinscription" img="/document.gif" />
      </div>
      <div className="flex mt-10">
        <Card className="w-2/3 h-96">
          <CardHeader className="text-xl font-semibold">La liste des étudiant</CardHeader>
          <CardContent className="overflow-auto h-72">
            <Table>
              <TableCaption>La liste des étudiants</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEtudiants.map((etudiant:any) => (
                  <TableRow key={etudiant.user.id}>
                    <TableCell className="font-medium">{etudiant.user.lastName}</TableCell>
                    <TableCell>{etudiant.user.firstName}</TableCell>
                    <TableCell>{etudiant.user.email}</TableCell>
                    <TableCell>{etudiant.classId}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/etudiants/${etudiant.user.id}`}>
                        <Button variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="w-1/3 h-96 ml-5">
          <CardHeader className="text-xl font-semibold">La liste des Professeurs</CardHeader>
          <CardContent className="overflow-auto h-72">
            {professeurs.map((chat:any) => (
              <Link
                href={`/admin/professeurs/${chat.user.id}`}
                className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-100 dark:hover:bg-meta-4"
                key={chat.id}
              >
                <div className="relative h-14 w-14 rounded-full">
                  <Image
                    width={56}
                    height={56}
                    src={profile}
                    alt="User"
                    style={{
                      width: "auto",
                      height: "auto",
                    }}
                  />
                  <span
                    className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                  >
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <h5 className="font-medium text-black dark:text-white">
                      {chat.user.firstName} {chat.user.lastName}
                    </h5>
                    <p>
                      <span className="text-xs">{chat.user.email}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeAdmin;
