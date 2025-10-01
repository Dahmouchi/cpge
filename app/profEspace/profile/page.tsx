"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/loading";
import { StudentForm } from "./_components/studentForm";
import { PasswordForm } from "./_components/passwordForm";

const ReadUpdateEtudiants = (params: any) => {
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get(`/api/professeurs/${params.user.id}`);
        setStudentData(studentResponse.data);
     
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
      await axios.put(`/api/professeurs/${params.user.id}`, data);
      toast.success("Les informations de l'étudiant ont été mises à jour avec succès");
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("Ancien mot de pass est incorrect");
      console.error(error);
    }
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
          {/* Student Information Form */}
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
                classes={studentData?.classes}
              />
            </CardContent>
          </Card>
        </CardContent>
        
      </Card>
      <Card className="lg:w-1/2">
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
  );
};

export default ReadUpdateEtudiants;
