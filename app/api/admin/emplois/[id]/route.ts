"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation/validaterequest";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log("the bst on is ",id)
  const allMatieres = await prisma.emploi.findMany({
    where: {
      classes: {
        some: {
          id: id,
        },
      },
    },
    include:{
      document:true,
      goups:true,
    },
    orderBy: {
      createdAt: 'desc', // Sort by the createdAt field in descending order
    },
  });
  if (!allMatieres) {
    return NextResponse.json(
      { error: "Aucune matière trouvée" },
      { status: 404 }
    );
  }
  return NextResponse.json(allMatieres, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { name, description, teacher } = await req.json();
  const { user } = await validateRequest();

  if (!name) {
    return NextResponse.json(
      { error: "Le nom de la matière est requis" },
      { status: 400 }
    );
  }

  if (!id) {
    return NextResponse.json(
      { error: "Class ID is required" },
      { status: 400 }
    );
  }
  const matiere = await prisma.emploi.create({
    data: {
      name: name,
      description: description,
      classes: {
        connect: {
          id: id,
        },
      },
     
    },
  });

  return NextResponse.json(matiere, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json(
      { error: "Matiere ID is required" },
      { status: 400 }
    );
  }
  try {
    const files = await prisma.file.deleteMany({
      where: {
        emploiId: id,
      },
    });
    const content = await prisma.emploi.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the matiere" },
      { status: 500 }
    );
  }
}