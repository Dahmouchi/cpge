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
  const [parentData, setParentData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const studentResponse = await axios.get(`/api/etudiants/${params.user.id}`);
        setStudentData(studentResponse.data);
        
        if (studentResponse.data.parentId) {
          setParentData(studentResponse.data.parent);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.user.id,loading]);

  const handleStudentSubmit = async (data: any) => {
    try {
      await axios.put(`/api/etudiants/${params.user.id}`, data);
      toast.success("Les informations de l'étudiant ont été mises à jour avec succès");
      
    } catch (error) {
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
        <CardContent >
          {/* Student Information Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
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
                  groupe:studentData?.group?.name || "",
                }}  
              />
            </CardContent>
          </Card>
              {/* Parent Information Form */}
              <Card className="">
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
