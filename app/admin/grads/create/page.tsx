"use client";

import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-toastify";

const subjects = [
  { id: 0, name: "ConcoursBlans" },
  { id: 1, name: "DS" },
  { id: 2, name: "TP" },
  { id: 3, name: "TIPE" },
  { id: 4, name: "COLLE" },
  { id: 5, name: "DL" },
  { id: 6, name: "TEST" },
];
const trim = [
  { id: 0, name: "1er trim" },
  { id: 1, name: "2em trim" },
  { id: 3, name: "3em trim" },
];
type AbsenceStatus = {
  [studentId: number]: boolean; // boolean representing absence status (true/false)
};

type Justification = {
  status: "justified" | "not_justified";
  reason: string;
};

type Justifications = {
  [studentId: number]: Justification;
};
type FilterOptions = {
  subjectId: string;
  type: string;
  trim: string;
  nbr?: string; // optional, only used for DS
};
const Classes = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [etudiants, setEtudiants] = useState<any[]>([]);
  const [matieres, setMatieres] = useState<any[]>([]);
  const [selectMatiere, setSelectMatiere] = useState<any>();
  const [selectType, setSelectType] = useState<any>();
  const [selectTrim, setSelectTrim] = useState<any>();
  const [absenceStatus, setAbsenceStatus] = useState<AbsenceStatus>({});
  const [justifications, setJustifications] = useState<Justifications>({});
  const [nbr, setNbr] = useState("");
  const [filteredEtudiants, setFilteredEtudiants] = useState<any[]>([]);
  const [grades, setGrades] = useState<{ [key: number]: number | undefined }>(
    {}
  );

  const [controle, setControle] = useState(false);

  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await axios.get("/api/classes");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };
    getClasses();
  }, []);

  useEffect(() => {
    setFilteredEtudiants(
      etudiants.filter((etudiant: any) =>
        etudiant.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, etudiants]);

  const getInfos = async () => {
    setLoading(true);
    try {
      const fetchedEtudiants = await axios.get(
        `/api/etudiants/classes/${selectedClass}`
      );
      setEtudiants(fetchedEtudiants.data);
      setFilteredEtudiants(fetchedEtudiants.data);
      setControle(true);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClassSelect = (className: any) => {
    setSelectedClass(className.id);
    setMatieres(className.subjects);
  };

  const handleMatiere = (matiere: any) => {
    setSelectMatiere(matiere);
  };

  const handleType = (type: any) => {
    setSelectType(type);
  };
  const handleTrim = (type: any) => {
    setSelectTrim(type);
  };
  const handleNbr = (nbr: any) => {
    setNbr(nbr);
  };

  const search = () => {
    if (!selectedClass || !selectMatiere) {
      toast.error("Vous n'avez pas sélectionné toutes les informations");
    } else {
      setEtudiants([]);
      getInfos();
    }
  };

  const handleGradeChange = (studentId: number, value: string) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: value ? parseFloat(value) : undefined,
    }));
  };

  const getFilteredGrades = async (filters: FilterOptions) => {
    try {
      const { subjectId, type, trim, nbr } = filters;

      // Define the query parameters based on the filters
      let queryParams: any = { subjectId, type, trim, nbr };

      // Make the API call with the query params
      const response = await axios.get("/api/grads", { params: queryParams });

      // Return the filtered data
      return response.data;
    } catch (error) {
      console.error("Error fetching filtered grades:", error);
      throw error;
    }
  };
  const addGrads = async () => {
    setLoading(true);

    try {
      const res = await Promise.all(
        filteredEtudiants.map(async (etudiant) => {
          const etat = absenceStatus[etudiant.id] || false;
          const justification = justifications[etudiant.id] || {};
          const gradeValue = grades[etudiant.user.id];

          if (gradeValue !== undefined) {
            // Add the grade for the student
            const response = await axios.post("/api/grads", {
              studentId: etudiant.id,
              subjectId: selectMatiere.id,
              type: selectType.name,
              value: gradeValue,
              trim: selectTrim.name,
              etat,
              absent: justification.status || null,
              etatJust: justification.reason || null,
              number: parseInt(nbr),
            });

            if (response.status === 201) {
              const filters = {
                subjectId: selectMatiere?.id,
                type: selectType?.name,
                trim: selectTrim?.name,
                nbr: nbr, // Only add if DS is selected
              };
              const fetchedEtudiants = await getFilteredGrades(filters);

              // Fetch all grades for this subject and term
              // Sort grades by value in descending order
              
              console.log("hello",fetchedEtudiants);

              // Update classement for each grade
              await Promise.all(
                fetchedEtudiants.map((grade: any, index: any) =>
                  axios.put(`/api/grads/${grade.id}`, {
                    classement: index + 1, // Rank based on sorted position
                    value: grade.value,
                  })
                )
              );
            }
            return response;
          }

          return Promise.resolve({ status: 204 });
        })
      );

      if (res.every((r) => r.status === 201 || r.status === 204)) {
        setLoading(false);
        toast.success(
          "Les notes et classements ont été mis à jour avec succès."
        );
        setSelectType("");
        setSelectMatiere("");
        setSelectTrim("");
        setSelectedClass("");
        setControle(false);
        setAbsenceStatus({});
        setJustifications({});
        setNbr("");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Erreur lors de l'enregistrement des notes.");
    }
  };
  const addGrad = async () => {
    setLoading(true);
  
    try {
      const res = await Promise.all(
        filteredEtudiants.map(async (etudiant) => {
          const etat = absenceStatus[etudiant.id] || false;
          const justification = justifications[etudiant.id] || {};
          const gradeValue = grades[etudiant.user.id];
  
          if (gradeValue !== undefined) {
            // Add the grade for the student
            const response = await axios.post("/api/grads", {
              studentId: etudiant.id,
              subjectId: selectMatiere.id,
              type: selectType.name,
              value: gradeValue,
              trim: selectTrim.name,
              etat,
              absent: justification.status || null,
              etatJust: justification.reason || null,
              number: parseInt(nbr),
            });
  
            return response;
          }
  
          return Promise.resolve({ status: 204 });
        })
      );
  
      if (res.every((r) => r.status === 201 || r.status === 204)) {
        // Step 1: Fetch all grades for this subject and term
        const filters = {
          subjectId: selectMatiere?.id,
          type: selectType?.name,
          trim: selectTrim?.name,
          nbr: nbr, // Only add if DS is selected
        };
        const fetchedEtudiants = await getFilteredGrades(filters);
  
        if (fetchedEtudiants.length > 0) {
          // Step 2: Calculate max and min grades
          const allGrades = fetchedEtudiants.map((grade:any) => grade.value);
          const maxGrade = Math.max(...allGrades);
          const minGrade = Math.min(...allGrades);
  
          // Step 3: Update classement and maxmin for each grade
          fetchedEtudiants.sort((a:any, b:any) => b.value - a.value); // Sort grades in descending order
          await Promise.all(
            fetchedEtudiants.map((grade:any, index:any) =>
              axios.put(`/api/grads/${grade.id}`, {
                classement: index + 1, // Rank based on sorted position
                maxmin: `${maxGrade} - ${minGrade}`,
                value: grade.value, // Reconfirm value for consistency
              })
            )
          );
        }
  
        // Step 4: Reset state after successful updates
        setLoading(false);
        toast.success("Les notes et classements ont été mis à jour avec succès.");
        setSelectType("");
        setSelectMatiere("");
        setSelectTrim("");
        setSelectedClass("");
        setControle(false);
        setAbsenceStatus({});
        setJustifications({});
        setNbr("");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("Erreur lors de l'enregistrement des notes.");
    }
  };
  
  const handleAbsenceChange = (studentId: any, isChecked: any) => {
    setAbsenceStatus((prev) => ({
      ...prev,
      [studentId]: isChecked,
    }));
  };

  const handleJustificationChange = (studentId: any, justification: any) => {
    setJustifications((prev) => ({
      ...prev,
      [studentId]: justification,
    }));
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-2 space-y-4">
      <div className="sticky top-0 z-10 space-y-2 pb-2">
        <Card className="w-full bg-white rounded-lg p-4 drop-shadow-sm">
          <div>
            <h1 className="text-2xl font-semibold mb-4">
              La gestion des notes pour les étudiants
            </h1>
            <h1 className="text-lg font-semibold mb-2">
              Ici, vous pouvez sélectionner la classe et les informations
            </h1>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex justify-center items-center">
              <div className="ml-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      {selectedClass
                        ? `Classe sélectionnée: ${selectedClass}`
                        : "Sélectionnez une classe"}
                      <ChevronDown className="ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      Sélectionnez une classe
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {classes.map((cls) => (
                        <DropdownMenuItem
                          key={cls.id}
                          onClick={() => handleClassSelect(cls)}
                        >
                          {cls.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="ml-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      {selectMatiere
                        ? ` ${selectMatiere.name}`
                        : "Sélectionnez la matière"}
                      <ChevronDown className="ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>La matière</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {matieres.map((cls) => (
                        <DropdownMenuItem
                          key={cls.id}
                          onClick={() => handleMatiere(cls)}
                        >
                          {cls.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mx-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      {selectType ? ` ${selectType.name}` : "Sélectionnez type"}
                      <ChevronDown className="ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {subjects.map((cls) => (
                        <DropdownMenuItem
                          key={cls.id}
                          onClick={() => handleType(cls)}
                        >
                          {cls.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Entrer le N° "
                  value={nbr}
                  onChange={(e) => handleNbr(e.target.value)}
                  className="py-2 px-3 my-2"
                />
              </div>

              <div className="ml-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      {selectTrim ? ` ${selectTrim.name}` : "Sélectionnez Trim"}
                      <ChevronDown className="" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Trim</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {trim.map((cls) => (
                        <DropdownMenuItem
                          key={cls.id}
                          onClick={() => handleTrim(cls)}
                        >
                          {cls.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Button
              onClick={() => search()}
              className="bg-green-900 my-8 float-right px-5 py-2 text-white text-sm font-bold tracking-wide rounded-md focus:outline-none"
            >
              Rechercher <Search className="ml-2" />
            </Button>
          </div>
          {controle && (
            <div className="flex justify-end w-full">
              <Button onClick={addGrad}>Enregistrer les notes</Button>
            </div>
          )}
        </Card>
      </div>
      <div className="mt-6">
        {controle && (
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-lg font-semibold">
                Étudiants de la classe {selectedClass}
              </h1>
              <div className="flex justify-between items-center">
                <div className="ml-4">
                  <Input
                    type="text"
                    placeholder="Rechercher un étudiant"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="py-2 px-3"
                  />
                </div>
              </div>
            </div>
            <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <TableCaption>
                Liste des étudiants de la classe {selectedClass}
              </TableCaption>
              <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <TableRow>
                  <TableHead className="font-bold">Nom</TableHead>
                  <TableHead className="font-bold">Prenom</TableHead>
                  <TableHead className="font-bold">Note</TableHead>
                  <TableHead className="font-bold text-center">
                    Absent
                  </TableHead>
                  <TableHead className="font-bold">Justification</TableHead>
                  <TableHead className="font-bold">Détails</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEtudiants.map((etudiant) => (
                  <TableRow
                    key={etudiant.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <TableCell>{etudiant.user.lastName}</TableCell>
                    <TableCell>{etudiant.user.firstName}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        placeholder="Entrez la note"
                        value={grades[etudiant.user.id] ?? ""}
                        onChange={(e) =>
                          handleGradeChange(etudiant.user.id, e.target.value)
                        }
                        className="py-2 px-3"
                      />
                    </TableCell>
                    <TableCell className="flex flex-row justify-center items-center">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          handleAbsenceChange(etudiant.id, e.target.checked)
                        }
                        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </TableCell>
                    <TableCell>
                      {absenceStatus[etudiant.id] && (
                        <select
                          value={justifications[etudiant.id]?.status || ""}
                          onChange={(e) =>
                            handleJustificationChange(etudiant.id, {
                              ...justifications[etudiant.id],
                              status: e.target.value,
                            })
                          }
                          className="py-2 px-3"
                        >
                          <option value="">Sélectionner</option>
                          <option value="justified">Justifié</option>
                          <option value="not_justified">Non Justifié</option>
                        </select>
                      )}
                    </TableCell>
                    <TableCell>
                      {justifications[etudiant.id]?.status === "justified" && (
                        <Input
                          type="text"
                          placeholder="Entrez la justification"
                          value={justifications[etudiant.id]?.reason || ""}
                          onChange={(e) =>
                            handleJustificationChange(etudiant.id, {
                              ...justifications[etudiant.id],
                              reason: e.target.value,
                            })
                          }
                          className="py-2 px-3"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;
