import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const allProfessors = await prisma.teacher.findUnique({
    where: {
      userId: id,
    },
    include: {
      user: true,
      classes: {
        include:{
          subjects:true,
        }
      },
      remarks:true,
      subjects:true,
      contents:{
        include:{
          subject:true,
          document:true,
          teacher:{
            include:{
              user:true
            }
          },
          admin:{
            include:{
              user:true,
            }
          },
        },
        orderBy:{
          createdAt:"desc"
        }
        
      },
      news:{
        include:{
          document:true,
          admin:{
            include:{
              user:true,
            }
          },
          teacher:{
            include:{
              user:true,
            }
          },
          
        },
        orderBy:{
          createdAt:"desc"
        }
      },
      emploi:{
        include:{
          document:true
        },
        orderBy:{
          createdAt:"desc"
        }
      },
      absence:{
        include:{
          subject:true,
        },
        orderBy:{
          id:"desc",
        }
      },
    },
  });

  if (!allProfessors) {
    return NextResponse.json(
      { error: "Professeur not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(allProfessors, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "Professeur ID is required" },
        { status: 400 }
      );
    }
    await prisma.teacher.delete({
      where: { userId: id },
    });
    await prisma.user.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Professeur deleted successfully" },
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "Professeur ID is required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    const { lastName, firstName, email, phone, address, classes,password ,oldPassword, newPassword } = await req.json();
    const username = email;
    const lowerCaseEmail = email ? email.toLowerCase() : email;

      const updateUserData: any = { lastName, firstName, email:lowerCaseEmail, phone, address,password,username };
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

    if (classes) {
      const classIds = classes.map((cls: any) => cls.value);

      await prisma.teacher.update({
        where: { userId: id },
        data: {
          classes: {
            set: []
          },
        },
      });

      await prisma.teacher.update({
        where: { userId: id },
        data: {
          classes: {
            connect: classIds.map((classId: string) => ({ id: classId })),
          },
        },
      });
    }

    return NextResponse.json(
      { message: "Professeur updated successfully" },
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
