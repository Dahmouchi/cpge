
import { validateRequest } from "@/lib/validation/validaterequest";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RemarkCompo from "@/components/ui/remarkCompo"

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
        remarks:{
          orderBy:{
            id:"desc",
          }
        }
      },
      
    });
    return (
      <Card className="p-5">
        <CardTitle>Votre Remarque</CardTitle>
        <CardHeader>
          <h1 className="text-lg text-w">la liste des Remarque par l'administationt et votre professeurs </h1>
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
