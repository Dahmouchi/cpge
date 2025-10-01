'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Eye} from "lucide-react";

import { Input } from "@/components/ui/input";

import axios from 'axios';
import Loading from "@/components/loading";
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const Classes = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await axios.get('/api/classes');
        setClasses(response.data);
        setFilteredClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };
    getClasses();
  }, []);

  useEffect(() => {
    setFilteredClasses(
      classes.filter((classe) =>
        classe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classe.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, classes]);


  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10 space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Sélectionner la class pour ajouter une publication</h1>
          <div className="flex justify-between items-center">
          <Input
            type="text"
            placeholder="Rechercher par nom ou identifiant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 mr-3"
          />
          <div className=' bg-slate-200 p-2.5 rounded-sm'>
            <Search className="w-4 h-4"/>
          </div>
          </div>
        </div>
        <Card className='p-3'>
        <Table>
          <TableCaption>{filteredClasses.length === 0 ? "Le tableau est vide" : "La liste des classes disponibles."}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Identifiant</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.map((classe) => (
              <TableRow key={classe.id}>
                <TableCell className="font-medium">{classe.id}</TableCell>
                <TableCell>{classe.name}</TableCell>
                <TableCell>{classe.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-center items-center">         
                    <Link href={`/admin/news/${classe.id}`}  className="ml-2 bg-emerald-700 hover:bg-emerald-600 p-3 rounded-sm">
                          <Plus className="w-4 h-4 text-white" />
                    </Link >
                  </div>
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

export default Classes;
