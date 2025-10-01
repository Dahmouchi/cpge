
import { validateRequest } from "@/lib/validation/validaterequest";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RemarkCompo from "@/components/ui/remarkCompo"
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page =async () => {
  const { user } = await validateRequest();
  if (!user) {
    return null;
  } else {
    const userInfo = await prisma.teacher.findFirst({
      where: {
        userId: user.id,
      },
      include:{
        remarks:true,
        user:true,
      }
    });
    return (
      <Card className="p-5">
        <CardTitle>Votre Remarque</CardTitle>
        <CardHeader>
          <h1 className="text-lg text-w">la liste des remarque </h1>
          <div className="flex justify-between items-center">
            <h1 className="text-sm text-w">vous pouvais ajouter des remarques pour votre etudiants </h1>
           
          </div>
        </CardHeader>
        <CardContent>
        <div className="flex flex-col py-2">
            {
              userInfo?.remarks.map((remarque:any) => <div key={remarque.id}><RemarkCompo remarque={remarque}/></div>)
            }
            </div>  
        </CardContent>
      </Card>
  );}
}

export default Page;
