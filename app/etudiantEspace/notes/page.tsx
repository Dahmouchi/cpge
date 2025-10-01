
import { validateRequest } from "@/lib/validation/validaterequest";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GradsTable from "@/app/admin/etudiants/_components/notes"

const Page =async () => {

  const { user } = await validateRequest();

  

  if (!user) {
    return null;
  } else {
    const userInfo = await prisma.student.findFirst({
      where: {
        userId: user.id,
      },
      include:{
        class: {
          include:{
            subjects:true
          }
        },
        grades:{
          include:{
            subject:true,
          },
          orderBy:{
            id:"desc",
          }
        }
      },
      
    });
    return (
      <Card className="lg:p-5 p-2">
        <CardTitle>Votre Notes</CardTitle>
        <CardHeader>
          <h1 className="text-lg">la liste des 1ér, 2ém et 3ém trim </h1>
        </CardHeader>
        <CardContent>
         <GradsTable grads={userInfo?.grades} role="student" matieres={userInfo?.class.subjects}/>
        </CardContent>
      </Card>
  );}
}

export default Page;
