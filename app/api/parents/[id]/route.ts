import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const student = await prisma.parent.findUnique({
    where: {
      userId: id,
    },
    include: {
      user: true,
      student:{
        include:{
          user:true,
          paymentAgreement:{
            include:{
              installments:true
            }
          }
        }
      },
    },
  });
  if (!student) {
    return NextResponse.json({ error: "Étudiant non trouvé" }, { status: 404 });
  }
  return NextResponse.json(student, { status: 200 });
}
