"use client"
import { useState, useEffect } from 'react';
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
import { Pencil, Trash , Plus, Eye} from "lucide-react";
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
import { Label } from "@/components/ui/label";
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
import axios from 'axios';
import Loading from "@/components/loading";
import Link from 'next/link';
import { Card, CardHeader } from '@/components/ui/card';
import { toast } from 'react-toastify';

const Classes = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogModifiyOpen, setDialogModifiyOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', description: '' });
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

  const fetchClasses = async () => {
    try {
      const response = await axios.get('/api/classes');
      return response.data;
    } catch (error) {
      console.error('Error fetching classes:', error);
      return [];
    }
  };

  const handleAddClass = async () => {
    setLoading(true);
    try {
      await axios.post('/api/classes', formData);
      const updatedClasses = await fetchClasses();
      setClasses(updatedClasses);
      setFilteredClasses(updatedClasses);
      setDialogOpen(false);
      setFormData({ id: '', name: '', description: '' });
      toast.success("Ajouter avec success")
    } catch (error) {
      console.error('Error adding class:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClass = async () => {
    setLoading(true); // Start loading state
    try {
      await axios.patch(`/api/classes/${formData.id}`, formData);
      
      // Fetch the updated list of classes
      const updatedClasses = await fetchClasses();
      setClasses(updatedClasses); // Update the state with the new list of classes
      setFilteredClasses(updatedClasses); 
 
      setFormData({ id: '', name: '', description: '' });
      setDialogModifiyOpen(false); 
      toast.success("Modifier avec success")
    } catch (error) {
      console.error('Error updating class:', error);
      setDialogModifiyOpen(false); 
      toast.error("il y a un probléme au cour de modification")

    } finally {
      setLoading(false); // Stop loading state
      setDialogModifiyOpen(false); 

    }
  };

  const handleDeleteClass = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`/api/classes/${id}`);
      const updatedClasses = await fetchClasses();
      setClasses(updatedClasses);
      setFilteredClasses(updatedClasses);
      setLoading(false);
    } catch (error) {
      console.error('Error deleting class:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10 space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">La gestion des classes</h1>
          <div className="flex justify-between items-center">
          <Input
            type="text"
            placeholder="Rechercher par nom ou identifiant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 mr-3"
          />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-800 hover:bg-emerald-700 float-right">Ajouter</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter une classe</DialogTitle>
                <DialogDescription>Vous pouvez ajouter une classe</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="id" className="text-right">
                    Identifiant
                  </Label>
                  <Input
                    id="id"
                    name="id"
                    placeholder="MPSI-1"
                    className="col-span-3"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Class 1"
                    className="col-span-3"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Class 1 description"
                    className="col-span-3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddClass}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          </div>
        </div>
        <Card className='p-3'>
        <CardHeader>
          <h1 className="text-md font-bold">La list des classes</h1>
          <h1 className="text-md">Vous pouvez cliquer sur le bouton plus pour ajouter d'emplois et des cours pour chaque matiéres</h1>
        </CardHeader>
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
                    <Dialog open={dialogModifiyOpen} onOpenChange={setDialogModifiyOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => setFormData(classe)} variant="outline">
                          <Pencil className="w-4 h-4 text-gray-600" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Modifier une classe</DialogTitle>
                          <DialogDescription>Vous pouvez modifier la classe</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="id" className="text-right">
                              Identifiant
                            </Label>
                            <Input
                              id="id"
                              name="id"
                              className="col-span-3"
                              value={formData.id}
                              disabled={true}
                              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Nom
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              className="col-span-3"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Description
                            </Label>
                            <Input
                              id="description"
                              name="description"
                              className="col-span-3"
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleUpdateClass}>Modifier</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="ml-2">
                          <Trash className="w-4 h-4 text-red-600" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Êtes-vous sûrs?</AlertDialogTitle>
                          <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteClass(classe.id)}>
                            Continuer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>   
                    <Link href={`/admin/classes/${classe.id}`}  className="ml-2 bg-white hover:bg-gray-200 p-3 rounded-sm border border-gray-200">
                      <Eye className="w-4 h-4" />
                    </Link >
                    <Link href={`/admin/courses/${classe.id}`}  className="ml-2 bg-emerald-700 hover:bg-emerald-600 p-3 rounded-sm">
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
