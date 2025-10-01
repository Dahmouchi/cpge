"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/loading";
import { StudentForm } from "./_components/studentForm";
import { ParentForm } from "./_components/parentForm";
import { PasswordForm } from "./_components/passwordForm";

const ReadUpdateEtudiants = (params: any) => {
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<any>(null);
  const [installmetnData, setInstallmetnData] = useState<any>(null);
  const [parentData, setParentData] = useState<any>(null);
  const [payment,setPayment]= useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ress = await axios.get(`/api/parents/${params.user.id}`);
        console.log(ress.data.student.paymentAgreement)
        setParentData(ress.data)
        setStudentData(ress.data.student);
        setPayment(ress.data.student.paymentAgreement);
        setInstallmetnData(ress.data.student.paymentAgreement.installments);
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.user.id,loading]);

  const handleStudentSubmit = async (data: any) => {
    setLoading(true);
    try {
      await axios.put(`/api/parent/${params.user.id}`, data);
      toast.success("Les informations de l'étudiant ont été mises à jour avec succès");
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("Ancien mot de pass est incorrect");
      console.error(error);
    }
  };

  const handleParentSubmit = async (data: any) => {
   
  };

  
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fiche d&apos;informations</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
                }}  
              />
            </CardContent>
          </Card>
              <Card>
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
              </CardContent>
            </Card>
          
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
                    
                  </div>
                ))}
            </div>
          </CardContent>
          :
          <CardContent>
              <div className="flex flex-col py-2">
                
              </div>
            </CardContent>
          }
          </Card>  
          <Card >
          <CardHeader>
                <CardTitle>Changer le mot de pass</CardTitle>
              </CardHeader>
              <CardContent>
                  <PasswordForm 
                  onSubmit={handleStudentSubmit}
                  /> 
              </CardContent>
            </Card>
        </div>
        </CardContent>
      </Card>
      
             
    </div>
  );
};

export default ReadUpdateEtudiants;
