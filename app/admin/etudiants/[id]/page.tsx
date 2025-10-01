"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft, Trash } from "lucide-react";
import Loading from "@/components/loading";
import { StudentForm } from "../_components/studentForm";
import { ParentForm } from "../_components/parentForm";
import { PaymentForm } from "../_components/paymentForm";
import GradsTable from "../_components/notes"
import { Button } from "@/components/ui/button";
import { AgreeForm } from "../_components/agreePay";
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
import ReusableComponent from "@/components/ui/v0-blocks/reusable-feed-block-remark"
const ReadUpdateEtudiants = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<any[]>([]);
  const [studentData, setStudentData] = useState<any>(null);
  const [installmetnData, setInstallmetnData] = useState<any>(null);
  const [parentData, setParentData] = useState<any>(null);
  const [parentId, setParentId] = useState<number | null>(null);
  const [payment,setPayment]= useState<any>();
  const [absence,setAbsence] = useState<any[]>([])
  const [remarque,setRemarque] = useState<any[]>([])
  const [matieres,setMatieres] = useState<any[]>([])
  const [update,setUpdate]=useState(false);
  const [groups,setGroups]=useState<any[]>([])
  const [grad,setGrads]=useState<any[]>([])

  const [newModePass,setNewModPass] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clasRes = await axios.get("/api/classes")
        setClasses(clasRes.data);
        const studentResponse = await axios.get(`/api/etudiants/${params.id}`);
        setStudentData(studentResponse.data);
        setGroups(studentResponse.data.class.groups)
        setPayment(studentResponse.data.paymentAgreement)
        setAbsence(studentResponse.data.absences)
        setRemarque(studentResponse.data.remarks)
        setGrads(studentResponse.data.grades)
        setMatieres(studentResponse.data.class.subjects)        
        if(payment){
          setInstallmetnData(studentResponse.data.paymentAgreement.installments)
        }
        
        if (studentResponse.data.parentId) {
          setParentData(studentResponse.data.parent);
          setParentId(studentResponse.data.parentId);
        }
      } catch (error) {
        toast.error("Une erreur est survenue lors du chargement des données.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loading,update,params.id]);

  const handleStudentSubmit = async (data: any) => {
    try {
      await axios.put(`/api/etudiants/${params.id}`, data);
      toast.success("Les informations de l'étudiant ont été mises à jour avec succès");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour des informations de l'étudiant");
      console.error(error);
    }
  };
  const changePassword = async (password: string) => {
    try {
      // Send the password along with other student details (if needed)
      const studentData = {
        password, // only password here, you could add other fields too
      };
  
      await axios.put(`/api/etudiants/${params.id}`, studentData);
  
      toast.success("Les informations de l'étudiant ont été mises à jour avec succès");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour des informations de l'étudiant");
      console.error(error);
    }
  };
  const changePasswordParent = async (password: string) => {
    try {
      // Send the password along with other student details (if needed)
      const data = {
        password, // only password here, you could add other fields too
      };
      if (studentData?.parentId) {
        await axios.put(`/api/parent/${studentData?.parent?.user?.id}`, data);
      }
      toast.success("Les informations de l'étudiant ont été mises à jour avec succès");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour des informations de l'étudiant");
      console.error(error);
    }
  };
  const handleParentSubmit = async (data: any) => {
    try {
      if (studentData?.parentId) {
        if (parentData) {
          await axios.put(`/api/parent/${studentData?.parent?.user?.id}`, data);
          toast.success("Les informations du parent ont été mises à jour avec succès");
        } else {
          await axios.post(`/api/parent`, data);
          toast.success("Les informations du parent ont été ajoutées avec succès");
        }
      } else {
        await axios.post("/api/parent", data);
        toast.success("Les informations du parent ont été ajoutées avec succès");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour des informations du parent");
      console.error(error);
    }
  };

  const handlPayment=async (data: any) =>{
    setLoading(true)
   try{
    const res = await axios.post('/api/payment',{
      paymentAgreementId: payment.id,
      amount: parseFloat(data.montant), 
      type:data.type,
    })
    if(res.status===201){
      toast.success("Le montant été ajoutées avec succès");
      setLoading(false)
    }
   }catch(err){
    toast.error("Une erreur est survenue lors de l'ajout de montant");
    setLoading(false)
   }finally{
    setLoading(false)
   }
  }
  const handleNewPayment = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/admin/paymentAgreement', {
        studentId: studentData?.id,
        totalAmount: data.total, 
        avanceAmount: data.avance, 
      });
      if (res.status === 201) {
        toast.success("Le montant a été ajouté avec succès");
      }
    } catch (err) {
      toast.error("Une erreur est survenue lors de l'ajout du montant");
    } finally {
      setLoading(false);
    }
  };
  const handleDeletePayment= async (id:any)=>{
    setLoading(true)
    try{
      const res = await axios.delete(`/api/payment/${id}`)
      if(res.status===200){
        toast.success("Le montant été supprimé avec succès");
        setLoading(false)
      }

    }catch(err){
      toast.error("Une erreur est survenue lors de supprimer de montant");
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }
  const handleDeleteAbsence = async(id:any)=>{
    setLoading(true);
    try {
      await axios.delete(`/api/absence/${id}`);
      toast.success("L'absence été supprimé avec succès");
      setLoading(false);
    } catch (error) {
      console.error('Error deleting class:', error);
    } finally {
      setLoading(false);
    }
  
  }
 
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
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between  items-center">
          <div>
            <CardTitle>Fiche d&apos;informations</CardTitle>
            <Link href="/admin/etudiants">
              <div className="inline-flex items-center space-x-2 text-blue-600 hover:underline">
                <ChevronLeft className="h-4 w-4" />
                <span>Retour</span>
              </div>
            </Link>
          </div>
          
        </CardHeader>
        <CardContent>
          {/* Student Information Form */}
        <div className="flex flex-row justify-between">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles de l&apos;étudiant</CardTitle>
            </CardHeader>
            <CardContent>
              <StudentForm
                onSubmit={handleStudentSubmit}
                defaultValues={{
                  lastName: studentData?.user?.lastName || "",
                  firstName: studentData?.user?.firstName || "",
                  email: studentData?.user?.email || "",
                  phone: studentData?.user?.phone || "",
                  address: studentData?.user?.address || "",
                  studentClass: studentData?.classId || "",
                  parentId: studentData?.parentId || "",
                  group:studentData?.groupId || "",
                }}
                classes={classes}
                groups ={groups}

              />
              <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button onClick={generatePasswords} className="my-3">Générer Mot de pass</Button>
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
            </CardContent>
          </Card>
              {/* Parent Information Form */}
              <Card className="bg-yellow-100">
              <CardHeader>
                <CardTitle>Informations du parent</CardTitle>
              </CardHeader>
              <CardContent>
                <ParentForm
                  onSubmit={handleParentSubmit}
                  defaultValues={{
                    lastName: parentData?.user?.lastName || "",
                    firstName: parentData?.user?.firstName || "",
                    phone: parentData?.user?.phone || "",
                    email: parentData?.user?.email || "",
                    studentId: studentData?.id || "",
                  }}
                  isEditing={!!parentData}
                />
                <div className="my-3">
                <AlertDialog >
                      <AlertDialogTrigger asChild>
                        <Button onClick={generatePasswords} className="bg-yellow-500">Générer Mot de pass</Button>
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
                          <AlertDialogAction onClick={() => changePasswordParent(newModePass)}>
                            Sauvegarder
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                </AlertDialog>   
                </div> 
              </CardContent>
            </Card>
          
          {/* payment Information Form */}
            <Card>
            <CardHeader>
              <CardTitle>Informations de paiement</CardTitle>
            </CardHeader>
            {studentData.paymentAgreement ? 
            <CardContent>
            <h1>Prix ​​convenu : {payment.totalAmount} DH</h1>
            <h1>Le montant d'avance : {payment.advanceAmount} DH</h1>
            <h1 >Le montant restant : {payment.remainingAmount} DH</h1>
            <hr className="mb-2 mt-2"/>
              <PaymentForm
                  onSubmit={handlPayment}           
              /> 
              <div className="flex flex-col py-2">
              {installmetnData &&
                installmetnData.map((installmetnData: any) => (
                  <div
                    key={installmetnData.id}
                    className="cursor-pointer bg-white hover:bg-slate-100 transition-colors ease-out w-full h-12 flex items-center justify-between px-2 border-y"
                  >
                    {installmetnData.amount}
                    
                    <div className="flex flex-col justify-start">
                      <div>{installmetnData.type}</div>
                      <div className="text-gray-500">{new Date(installmetnData.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      })}</div>
                    </div>
                    <div>
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
                          <AlertDialogAction onClick={() => handleDeletePayment(installmetnData.id)}>
                            Continuer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>   
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
          :
          <CardContent>
              <div className="flex flex-col py-2">
                <AgreeForm onSubmits={handleNewPayment} />
              </div>
            </CardContent>
          }
          </Card>        
        </div>
        </CardContent>
      </Card>
       {/* absence Information Form */}
      <Card className="p-5">
      <div className="flex flex-row items-start justify-between">
        <Card className="w-2/3">
            <CardHeader>
              <CardTitle>Informations d'absence</CardTitle>
              <h1 className="text-lg">Le nombre d'absence pour {studentData.user.firstName} est {absence.length}</h1>
            </CardHeader>
            <CardContent className="flex flex-row">
              
            <div className="flex flex-col py-2 overflow-y-auto h-96">
            <Table>
            <TableCaption>Absence des Étudiants</TableCaption>
            <TableHeader>
              <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Statu</TableHead>
              <TableHead>justification</TableHead>
              <TableHead>La matiére</TableHead>
                <TableHead >La date</TableHead>
                <TableHead>De - À</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody >
              {absence.map((abs) => (
                <TableRow key={abs.id}>
                  <TableCell>{abs.type}</TableCell>
                  <TableCell>{abs.statu}</TableCell>
                  <TableCell className="text-center">{abs.statu === "justifiée" ? abs.justification : "-"}</TableCell>

                  <TableCell>{abs.subject?.name}</TableCell>
                  <TableCell className="font-medium">
                    {new Date(abs.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>{abs.content} - {abs.contentA}</TableCell>
                  <TableCell>
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
                          <AlertDialogAction onClick={() => handleDeleteAbsence(abs.id)}>
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
          <Card className="w-1/3 ml-3">
            <CardHeader>
              <CardTitle>Les remarques</CardTitle>
              <h1 className="text-lg">Le nombre de remarques pour {studentData.user.firstName} est {remarque.length}</h1>
            </CardHeader>
            <CardContent className="flex flex-row overflow-y-auto h-80">       
            <div className="flex flex-col py-2">
            {
              remarque.map((remarque) => <ReusableComponent remarque={remarque} key={remarque.id} onDelete={()=>setUpdate(!update)}/>)
            }
            </div>            
          </CardContent>
          </Card>         
        </div>
       
      </Card>
      <Card className="py-3">
            <CardHeader>
              <CardTitle>Les Notes</CardTitle>
              <h1 className="text-lg">Voici les notes de l'étudiant</h1>
            </CardHeader>
            <CardContent className="">       
            <div className="">
              <GradsTable grads={grad} role="admin" matieres={matieres} update={()=>setUpdate(!update)}/>
            </div>            
          </CardContent>
          </Card>        
    </div>
  );
};

export default ReadUpdateEtudiants;
