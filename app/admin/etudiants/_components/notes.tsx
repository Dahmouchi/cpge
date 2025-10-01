  "use client"
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

  import { ChevronLeft, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {toast} from "react-toastify";
import { Card, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Bulletin from "./printGrads";

const Notes = ({ grads, role, update, matieres }: any) => {
    const [dialogModifiyOpen, setDialogModifiyOpen] = useState(false);
    const [formData, setFormData] = useState({ value: '', trim: '', subject: '', type: '' });
    const [selectedNote, setSelectedNote] = useState();
    const [selectedSubject, setSelectedSubject] = useState(''); // State for selected subject
  
    const handleUpdateClass = async () => {
      try {
        const updateData = {
          value: formData.value,
        };
        await axios.put(`/api/grads/${selectedNote}`, updateData);
        setDialogModifiyOpen(false);
        toast.success('Classe mise à jour avec succès');
        update();
      } catch (error) {
        console.error('Error updating class:', error);
        toast.error('Failed to update class');
      }
    };
  
    // Filter grades based on selected subject
    const filteredGrades = selectedSubject
      ? grads.filter((grad: any) => grad.subject.name === selectedSubject)
      : grads;
  
    return (
        <div>
             {/* Dropdown for selecting subject */}
          <div className="mb-4">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Toutes les matières</option>
              {matieres.map((mt: any) => (
                <option key={mt.id} value={mt.name}>
                  {mt.name}
                </option>
              ))}
            </select>
          </div>
        <div className="grid grid-cols-1 lg:gap-5 lg:grid-cols-2 w-full "> 
        <Card className="overflow-y-auto h-96">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>Les notes de 1ér Trim</div>
            <div><Bulletin grades={filteredGrades}/></div>
          </CardHeader>
  
          <Table className="overflow-x-auto">
            <TableCaption>Les notes de l'étudiant</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>La matière</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>La note</TableHead>
                <TableHead>Classement</TableHead>
                <TableHead>Max-Min</TableHead>

                <TableHead>Trim</TableHead>
                {role === "admin" && <TableHead>Statut</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.map((abs: any) => (
                abs.trim === "1er trim" &&
                <TableRow key={abs.id}>
                  <TableCell>{abs.subject.name}</TableCell>
                  <TableCell>{abs.type}{abs.numero}</TableCell>
                  <TableCell>{abs.value}</TableCell>
                  <TableCell>{abs.classement}</TableCell>
                  <TableCell>{abs.maxmin}</TableCell>
                  <TableCell>{abs.trim}</TableCell>
                  {role === "admin" &&
                    <TableCell>
                      <Dialog open={dialogModifiyOpen} onOpenChange={setDialogModifiyOpen}>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setSelectedNote(abs.id);
                              setFormData({
                                ...abs,
                                subject: abs.subject.name
                              });
                            }}
                            variant="outline"
                          >
                            <Pencil className="w-4 h-4 text-gray-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Modifier une note</DialogTitle>
                            <DialogDescription>Vous pouvez modifier la valeur de la note</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="value" className="text-right">
                                La note
                              </Label>
                              <Input
                                id="value"
                                name="value"
                                className="col-span-3"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="subject" className="text-right">
                                La matière
                              </Label>
                              <Input
                                id="subject"
                                name="subject"
                                className="col-span-3"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                disabled
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="type" className="text-right">
                                Le type
                              </Label>
                              <Input
                                id="type"
                                name="type"
                                className="col-span-3"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                disabled
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleUpdateClass}>Modifier</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
  
            <Card className="overflow-y-auto h-96">
                <CardHeader>Les notes de 2ém Trim</CardHeader>        
                <Table>
                    <TableCaption>Les notes de l'étudiant</TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead>La matière</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>La note</TableHead>
                        <TableHead>Classement</TableHead>
                        <TableHead>Max-Min</TableHead>

                        <TableHead>Trim</TableHead>
                        {role === "admin" && <TableHead>Statut</TableHead>}
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredGrades.map((abs: any) => (
                        abs.trim === "2em trim" &&
                        <TableRow key={abs.id}>
                        <TableCell>{abs.subject.name}</TableCell>
                        <TableCell>{abs.type}</TableCell>
                        <TableCell>{abs.value}</TableCell>
                        <TableCell>{abs.classement}</TableCell>
                        <TableCell>{abs.maxmin}</TableCell>

                        <TableCell>{abs.trim}</TableCell>
                        {role === "admin" &&
                            <TableCell>
                            <Dialog open={dialogModifiyOpen} onOpenChange={setDialogModifiyOpen}>
                                <DialogTrigger asChild>
                                <Button
                                    onClick={() => {
                                    setSelectedNote(abs.id);
                                    setFormData({
                                        ...abs,
                                        subject: abs.subject.name
                                    });
                                    }}
                                    variant="outline"
                                >
                                    <Pencil className="w-4 h-4 text-gray-600" />
                                </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Modifier une note</DialogTitle>
                                    <DialogDescription>Vous pouvez modifier la valeur de la note</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="value" className="text-right">
                                        La note
                                    </Label>
                                    <Input
                                        id="value"
                                        name="value"
                                        className="col-span-3"
                                        value={formData.value}
                                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                    />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="subject" className="text-right">
                                        La matière
                                    </Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        className="col-span-3"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        disabled
                                    />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="type" className="text-right">
                                        Le type
                                    </Label>
                                    <Input
                                        id="type"
                                        name="type"
                                        className="col-span-3"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        disabled
                                    />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleUpdateClass}>Modifier</Button>
                                </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            </TableCell>
                        }
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Card>
            <Card className="overflow-y-auto h-96">
          <CardHeader>Les notes de 3ém Trim</CardHeader>
  
          <Table>
            <TableCaption>Les notes de l'étudiant</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>La matière</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>La note</TableHead>
                <TableHead>Classement</TableHead>
                <TableHead>Max-Min</TableHead>

                <TableHead>Trim</TableHead>
                {role === "admin" && <TableHead>Statut</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.map((abs: any) => (
                abs.trim === "3em trim" &&
                <TableRow key={abs.id}>
                  <TableCell>{abs.subject.name}</TableCell>
                  <TableCell>{abs.type}</TableCell>
                  <TableCell>{abs.value}</TableCell>
                  <TableCell>{abs.classement}</TableCell>
                  <TableCell>{abs.maxmin}</TableCell>

                  <TableCell>{abs.trim}</TableCell>
                  {role === "admin" &&
                    <TableCell>
                      <Dialog open={dialogModifiyOpen} onOpenChange={setDialogModifiyOpen}>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setSelectedNote(abs.id);
                              setFormData({
                                ...abs,
                                subject: abs.subject.name
                              });
                            }}
                            variant="outline"
                          >
                            <Pencil className="w-4 h-4 text-gray-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Modifier une note</DialogTitle>
                            <DialogDescription>Vous pouvez modifier la valeur de la note</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="value" className="text-right">
                                La note
                              </Label>
                              <Input
                                id="value"
                                name="value"
                                className="col-span-3"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="subject" className="text-right">
                                La matière
                              </Label>
                              <Input
                                id="subject"
                                name="subject"
                                className="col-span-3"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                disabled
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="type" className="text-right">
                                Le type
                              </Label>
                              <Input
                                id="type"
                                name="type"
                                className="col-span-3"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                disabled
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleUpdateClass}>Modifier</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        </div>       
    </div>
  )
}

export default Notes