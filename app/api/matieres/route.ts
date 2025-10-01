import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const matieres = await prisma.subject.findMany();
    return NextResponse.json(matieres, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des matières" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  const { name, description } = await req.json();
  
  if (!name) {
    return NextResponse.json(
      { error: "Le nom de la matière est requis" },
      { status: 400 }
    );
  }
  
  try {
    const newMatiere = await prisma.subject.create({
      data: {
        name: name,
        description: description || '',
        teachers: {
          
        },
      },
    });

    return NextResponse.json(
      { message: 'Matière ajoutée avec succès', newMatiere },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}

