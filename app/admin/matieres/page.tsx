"use client";
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
import { Pencil, Trash } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import axios from 'axios';
import Loading from '@/components/loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMatiereForm = () => {
  const [formData, setFormData] = useState({ id: '', name: '', description: '' });
  const [matières, setMatières] = useState<any[]>([]);
  const [filteredMatières, setFilteredMatières] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogModifiyOpen, setDialogModifiyOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchmatiere = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/matieres');
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error('Error fetching matiere:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchMatières = async () => {
      try {
        const data = await fetchmatiere();
        setMatières(data);
        setFilteredMatières(data);
      } catch (err) {
        toast.error('Failed to load matières.');
      }
    };
    fetchMatières();
  }, []);

  useEffect(() => {
    setFilteredMatières(
      matières.filter((matiere) =>
        matiere.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, matières]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/matieres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        const updatedMatières = await fetchmatiere();
        setMatières(updatedMatières);
        setFilteredMatières(updatedMatières);
        setFormData({ id: '', name: '', description: '' }); // Clear the form
        setDialogOpen(false); // Close the dialog
      } else {
        const data = await res.json();
        toast.error(data.error || 'An error occurred');
      }
    } catch (err) {
      toast.error('An error occurred');
    }
  };

  const handleDeleteMatiere = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`/api/matieres/${id}`);
      const updatedMatières = matières.filter(matiere => matiere.id !== id);
      setMatières(updatedMatières);
      setFilteredMatières(updatedMatières);
      toast.success('Matière deleted successfully');
    } catch (error) {
      console.error('Error deleting matière:', error);
      toast.error('Failed to delete matière');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMatiere = async () => {
    setLoading(true); // Start loading state
    try {
      await axios.patch(`/api/matieres/${formData.id}`, formData);
      const updatedMatières = await fetchmatiere();
      setMatières(updatedMatières);
      setFilteredMatières(updatedMatières);
      setDialogModifiyOpen(false);
      setFormData({ id: '', name: '', description: '' }); // Clear the form
      toast.success('Matière updated successfully');
    } catch (error) {
      console.error('Error updating matière:', error);
      toast.error('Failed to update matière');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Matières</h1>
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
                <DialogTitle>Ajouter une matière</DialogTitle>
                <DialogDescription>Vous pouvez ajouter une matière.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Le titre
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Matière Name"
                    className="col-span-3"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Matière Description"
                    className="col-span-3"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Table>
          <TableCaption>{filteredMatières.length === 0 ? "Aucune matière trouvée" : "Liste des matières"}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMatières.map((matiere) => (
              <TableRow key={matiere.id}>
                <TableCell>{matiere.id}</TableCell>
                <TableCell>{matiere.name}</TableCell>
                <TableCell>{matiere.description}</TableCell>
                <TableCell>
                  <Dialog open={dialogModifiyOpen} onOpenChange={setDialogModifiyOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setFormData(matiere);
                          setDialogModifiyOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Modifier la matière</DialogTitle>
                        <DialogDescription>Vous pouvez modifier une matière.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Le titre
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Matière Name"
                            className="col-span-3"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Input
                            id="description"
                            name="description"
                            placeholder="Matière Description"
                            className="col-span-3"
                            value={formData.description}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleUpdateMatiere}>Modifier</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button  variant="destructive" className="ml-2">
                      <Trash className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer</AlertDialogTitle>
                        <AlertDialogDescription>
                          Êtes-vous sûr de vouloir supprimer cette matière? Cette action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteMatiere(matiere.id)}>
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AddMatiereForm;
