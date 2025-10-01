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

const Page = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return null;
  } else {
    const userInfo = await prisma.student.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        absences: {
          include: {
            subject: true,
          },
        },
      },
    });

    return (
      <Card className="lg:p-5 p-2">
        <CardHeader>
          <CardTitle className="text-2xl">
            Votre Absences
          </CardTitle>
          <h1 className="text-sm lg:text-lg">La liste des absences</h1>
        </CardHeader>
        <CardContent>
        <div className="lg:py-2">
              <Table className="ooverflow-x-auto">
                <TableCaption>Absence des Étudiants</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>La matière {userInfo?.classId}</TableHead>
                    <TableHead>La date</TableHead>
                    <TableHead>De - À</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userInfo?.absences.map((abs:any) => (
                    <TableRow key={abs.id}>
                      <TableCell>{abs.type}</TableCell>
                      <TableCell>{abs.subject ? abs.subject.name : ""}</TableCell>
                      <TableCell className="font-medium">
                        {new Date(abs.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        {abs.content} - {abs.contentA}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default Page;
