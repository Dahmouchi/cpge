"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Loading from "@/components/loading";
import { StudentForm } from "../_components/studentForm";
import { PasswordForm } from "../_components/passwordForm";

const ReadUpdateEtudiants = (params: any) => {
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get(`/api/admin/${params.params.id}`);
        setStudentData(studentResponse.data);     
      } catch (error) {
        toast.error("Une erreur est survenue lors du chargement des données.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.params.id,loading]);

  const handleStudentSubmit = async (data: any) => {
    try {
      await axios.put(`/api/admin/${params.params.id}`, data);
      toast.success("Les informations de l'étudiant ont été mises à jour avec succès");
      
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour des informations de l'étudiant");
      console.error(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex my-5 items-center justify-between">
        <h1 className="text-2xl font-semibold ">Profile</h1>
        <h1 className="text-gray-500">Dashboard / Profile</h1>
      </div>
    <div className="flex  gap-2">
       
          <Card  className="w-2/3">
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
            <StudentForm
                onSubmit={handleStudentSubmit}
                defaultValues={{
                  lastName: studentData?.lastName || "",
                  firstName: studentData?.firstName || "",
                  email: studentData?.email || "",
                  phone: studentData?.phone || "",
                  address: studentData?.address || "",
                }}
              />
            </CardContent>
          </Card>
      <Card className="w-1/3">
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
    </div>
  );
};

export default ReadUpdateEtudiants;
