import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the import based on your Prisma setup

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, phone, email, studentId } = await req.json();
    const updateUserData: any = { firstName, lastName, phone, email, studentId };
    // Check if the student exists
    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Check if the student already has a parent
    const existingParent = await prisma.parent.findUnique({
      where: { studentId },
    });
    if (existingParent) {    
      return NextResponse.json({ error: "les donné modifiér avec succéss" }, { status: 400 });
    }

      // Create the parent
    const parent = await prisma.parent.create({
      data: {
        user:{
            create: {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                username: email,
                statut: false,
                password: "",
                role:"PARENT",
              },
        },
        student:{
            connect:{
                id: studentId,
            }
        },
      },
    });
    const updatEtud = await prisma.student.update({
      where: { id: studentId },
      data:{
        parentId:parent.id
      },
    });
    return NextResponse.json({ parent,updatEtud }, { status: 201 });
    
    } catch (error) {
      console.error("Error creating parent and user:", error);
      return NextResponse.json({ error: "Failed to create parent and user" }, { status: 500 });
    }
    
}
