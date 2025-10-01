import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const student = await prisma.classes.findUnique({
    where: {
      id: id,
    },
    include: {
      emploi:{
        include:{
          document:true,
          goups:true,
        }
      },
      groups:true,
      subjects:{
        include:{
          teachers:{
            include:{
              user:true,
            }
          },
          contents:{
            
            orderBy: {
              createdAt: "desc",
            },
            include: {
              admin: {
                include: {
                  user: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                    },
                  },
                },
              },
              teacher:{
                include:{
                  user:true,
                }
              },
              document: true,
            },
          }
        }
      }
     

    },
  });
  if (!student) {
    return NextResponse.json({ error: "Étudiant non trouvé" }, { status: 404 });
  }
  return NextResponse.json(student, { status: 200 });
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: "Class ID is required" }, { status: 400 });
    }

    // First, delete related students
    await prisma.student.deleteMany({
      where: { classId: id },
    });

    // Then, delete the class
    await prisma.classes.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Class and related students deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting class and related students:", error);
    return NextResponse.json({ error: "An error occurred while deleting the class" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: "Class ID is required" }, { status: 400 });
    }

    const data = await req.json();

    // Remove subjects from the update if it's an empty array or not being updated
    
    delete data.subjects;
    

    const updatedClass = await prisma.classes.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return NextResponse.json({ message: "Class updated successfully", updatedClass }, { status: 200 });

  } catch (error) {
    console.error("Error updating class:", error);
    return NextResponse.json({ error: "An error occurred while updating the class" }, { status: 500 });
  }
}

  