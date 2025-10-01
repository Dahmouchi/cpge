import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function POST(req: NextRequest) {
  const { id, name, description } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Class name is required" }, { status: 400 });
  }

  // Create the class
  const createdClass = await prisma.classes.create({
    data: {
      id: id,
      name: name,
      description: description,
      // Create groups associated with the class
      groups: {
        create: [
          { name: "Groupe 1", description: "First group of the class" },
          { name: "Groupe 2", description: "Second group of the class" },
        ],
      },
    },
  });

  return NextResponse.json(createdClass, { status: 200 });
}

export async function GET() {
  const allClasses = await prisma.classes.findMany({
    include:{
      subjects:true,
      groups:true,
    }
  });

  if (!allClasses) {
    return NextResponse.json({ error: "No classes found" }, { status: 404 });
  }

  if (allClasses.length === 0) {
    return NextResponse.json({ message: "No classes found" }, { status: 404 });
  }

  return NextResponse.json(allClasses, { status: 200 });
}