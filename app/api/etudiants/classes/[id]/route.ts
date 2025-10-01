import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(  
  req: NextRequest,
  { params }: { params: { id: string } }
    ) {
    const id = params.id;
    const allStudents = await prisma.student.findMany({
      where:{
        classId:id,
      },
      include: {
        user: true,
        class: true,
        group:true,
      },
    });
  
    if (!allStudents) {
      return NextResponse.json({ error: "Aucun étudiant trouvé" }, { status: 404 });
    }
  
    if (allStudents.length === 0) {
      return NextResponse.json({ message: "Aucun étudiant trouvé" }, { status: 404 });
    }
  
    return NextResponse.json(allStudents, { status: 200 });
  }