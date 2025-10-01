import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  
  const student = await prisma.inviteEtud.findUnique({
    where: {
      email: params.id,
    },  
  });
  if (!student) {
    return NextResponse.json({ error: "email non trouvé" }, { status: 404 });
  }
  return NextResponse.json(student, { status: 200 });
}