import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const student = await prisma.parent.findUnique({
    where: {
      studentId: id,
    },
    include: {
      user: true,
    },
  });
  if (!student) {
    return NextResponse.json({ error: "Étudiant non trouvé" }, { status: 404 });
  }
  return NextResponse.json(student, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "Prent ID is required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    const { firstName, lastName, phone, email, password,oldPassword, newPassword } = await req.json();
    const lowerCaseEmail = email ? email.toLowerCase() : email;


    const updateUserData: any = { 
      firstName, 
      lastName, 
      phone, 
      email: lowerCaseEmail,  // Use the lowercase email
      password 
    };
    if (oldPassword && newPassword) {
      if(oldPassword === user?.password){
          await prisma.user.update({
            where: { id: id },
            data: {
              password:newPassword,
            },
          });
      }else{
        return NextResponse.json(
          { error: "the password inccorrect" },
          { status: 500 }
        );
      }
    }else{
      await prisma.user.update({
        where: { id: id },
        data: updateUserData,
      });
    }


    return NextResponse.json(
      { message: "parent updated successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the professeur" },
      { status: 500 }
    );
  }
}
