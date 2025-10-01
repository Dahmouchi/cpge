
import { validateRequest } from "@/lib/validation/validaterequest";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GradsTable from "@/app/admin/etudiants/_components/notes"

const Page =async () => {

  const { user } = await validateRequest();

  

  if (!user) {
    return null;
  } else {
    const userInfo = await prisma.parent.findFirst({
        where: {
          userId: user.id,
        },
        include:{
          student:{
            include:{
              class: {
                include:{
                  subjects:true
                }
              },
              grades:{
                include:{
                  subject:true,
                }
              },
            }
          },
        }
      });
    return (
      <Card className="lg:p5 p-3">
        <CardTitle>Votre Notes</CardTitle>
        <CardHeader>
          <h1 className="text-lg text-w">La liste des 1ér, 2ém et 3ém trim </h1>
        </CardHeader>
        <CardContent className="w-full"> 
         <GradsTable grads={userInfo?.student.grades} role="student" matieres={userInfo?.student.class.subjects}/>
        </CardContent>
      </Card>
  );}
}

export default Page;
