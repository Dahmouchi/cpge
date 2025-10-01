import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const student = await prisma.student.findUnique({
    where: {
      userId: id,
    },
    include: {
      user: true,
      group:true,
      class: {
        include:{
          subjects:true,
          groups:true,
        }
      },
      grades:{
        include:{
          subject:true,
          student:{
            include:{
              user:true,
            }
          },
        }
      },
      parent: {
        include:{
          user:true,
        }
      },
      paymentAgreement:{
        include:{
          installments:true
        }
      },
      remarks:true,
      absences:{
        include:{
          subject:true,
        }
      },

    },
  });
  if (!student) {
    return NextResponse.json({ error: "Étudiant non trouvé" }, { status: 404 });
  }
  return NextResponse.json(student, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
  }

  try {
    // Check if the student exists
    const student = await prisma.student.findUnique({ where: { userId: id } });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Delete the related parent record if it exists
    await prisma.parent.deleteMany({ where: { studentId: student.id } });

    // Delete the student
    await prisma.student.delete({ where: { userId: id } });

    return NextResponse.json({ message: "Student and related parent deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json({ error: "An error occurred while deleting the student" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "Id de l'étudiant est requis" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    // Parse request body
    const { lastName, firstName, email, phone, address, studentClass, group, oldPassword, newPassword, password } =
      await req.json();
      const lowerCaseEmail = email ? email.toLowerCase() : email;

    const username=email;
    // Update user data
    const updateUserData: any = { lastName, firstName, email:lowerCaseEmail, phone, address, password,username };
    
    if (oldPassword && newPassword) {
      if (oldPassword === user?.password) {
        await prisma.user.update({
          where: { id: id },
          data: {
            password: newPassword,
          },
        });
      } else {
        return NextResponse.json(
          { error: "Le mot de pass est incorrect" },
          { status: 500 }
        );
      }
    } else {
      await prisma.user.update({
        where: { id: id },
        data: updateUserData,
      });
    }

    // Update student data
    if (studentClass) {
      await prisma.student.update({
        where: { userId: id },
        data: {
          class: {
            connect: { id: studentClass }, // Assuming studentClass is the ID of the class
          },
        },
      });
    }

    // Update group if groupId is provided
    if (group) {
      await prisma.student.update({
        where: { userId: id },
        data: {
          group: {
            connect: { id: parseInt(group) }, // Assuming groupId is the ID of the group
          },
        },
      });
    }

    return NextResponse.json(
      { message: "Étudiant mis à jour avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
