"use server";

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const allMatieres = await prisma.teacher.findMany({
    where: {
      classes: {
        some: {
          id: id,
        },
      },
    },
    include: {
      user:true,
     },
    
   
  });
  if (!allMatieres) {
    return NextResponse.json(
      { error: "Aucune matière trouvée" },
      { status: 401 }
    );
  }
  return NextResponse.json(allMatieres, { status: 200 });
}
