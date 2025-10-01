import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { validateRequest } from "@/lib/validation/validaterequest";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        absence:{
          include:{
            subject:true,
          }
        },
      }
    });
    return (
      <Card className="p-5">
        <CardTitle>Votre Absences</CardTitle>
        <CardHeader>
          <h1 className="text-lg text-w">la liste des Absences </h1>
        </CardHeader>
        <CardContent>
        <div className="flex flex-col py-2">
          <Table>
            <TableCaption>Absence des Étudiants</TableCaption>
            <TableHeader>
              <TableRow>
              <TableHead>Type</TableHead>
                <TableHead>La matière </TableHead>
                <TableHead>La date</TableHead>
                <TableHead>De - À</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {userInfo?.absence.map((abs:any) => (
                <TableRow key={abs.id}>
                  <TableCell>{abs.type}</TableCell>
                  <TableCell>{abs.subject ? abs.subject.name : ""}</TableCell>
                  <TableCell className="font-medium">
                    {new Date(abs.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>{abs.content} - {abs.contentA}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        </CardContent>
      </Card>
  );}
}

export default Page;
