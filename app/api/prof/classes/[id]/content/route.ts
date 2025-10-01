"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation/validaterequest";
import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/actions/sendemail";
import { getFileUrl, uploadFile } from "@/lib/r2";
import  mime  from "mime";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  return NextResponse.json("hey", { status: 200 });
}

export async function POST(
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
  const formData = await req.formData();

  const classId:any = formData.get("classId")?.toString();
  const body:any = formData.get("body")?.toString();
  const title:any = formData.get("title")?.toString();
  const teacherId:any = formData.get("teacherId")?.toString();
  const files: File = formData.get("files") as File;
  const bytes = await files.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json(
      { error: "Authentification requise" },
      { status: 400 }
    );
  }
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${files.name.replace(
    /\.[^/.]+$/,
    ""
  )}-${uniqueSuffix}.${mime.getExtension(files.type)}`;

  await uploadFile(buffer, filename, files.type);

  // Get the URL of the uploaded file
  const fileUrl =  getFileUrl(filename);
  if (fileUrl){
  const roleField = user.role === "ENSEIGNANT" ? "teacher" : user.role === "ADMIN" ? "admin" : null;

    // Build the data object conditionally
    const data: any = {
      title: title,
      body: body,

      subject: {
        connect: {
          id: parseInt(id),
        },
      },
      
      document: {
        create: {
          name: files.name,
          fileurl: fileUrl,
          filetype: files.type,
        },
      },
    };
  
    // Conditionally add role-based field
    if (roleField === "teacher" ) {
      data[roleField] = {
        connect: {
          userId: user.id,
        },
      };
    }else{
      data["admin"] = {
        connect: {
          userId: user.id,
        },
      };
      if (teacherId) {
        data.teacher = {
          connect:{
            userId:teacherId
          }
        } ;
      }
    }
  

  const newPost = await prisma.content.create({
    data: data,
  });
    // Now, send an email to all students in the class
    if(user.role === "ADMIN"){
    const students = await prisma.student.findMany({
      where: { classId: classId },
      include: { user: true }, // Assuming the student table has a relation to the user table where email is stored
    });
    const teacher = await prisma.teacher.findUnique({
      where: { userId: teacherId },
      include: { user: true }, // Assuming the student table has a relation to the user table where email is stored
    });
    const emailContent = `
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                <h1 style="text-align: center; color: #333;">Nouveau Message - Cour de ${title}</h1>
                
                <p>${body}</p>
                
                <p>Merci de consulter votre espace pour plus de détails.</p>
                
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
                
                <p style="font-size: 12px; color: #999; text-align: center;">
                  Ceci est un message automatique. Merci de ne pas répondre à cet email.
                </p>
              </div>
            </body>
          </html>
      `;
    const emailPromises = students.map((student:any) => {  
      return sendEmail(
        student.user.email, 
        `Nouveau Message dans votre classe`, 
        emailContent
      );
    });
    if(user.role === "ADMIN"){
      if(teacher){
        sendEmail(
          teacher?.user.email, 
          `Nouveau Message dans votre classe`, 
          emailContent
        );
    }}
    // Await all email promises
    await Promise.all(emailPromises);
  }
  return NextResponse.json(newPost, { status: 200 });
  }
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
        contentId: id,
      },
    });
    const content = await prisma.content.delete({
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
