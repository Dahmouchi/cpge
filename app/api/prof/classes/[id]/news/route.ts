"use server";
import sendEmail from "@/actions/sendemail";

import prisma from "@/lib/prisma";
import { getFileUrl, uploadFile } from "@/lib/r2";
import { validateRequest } from "@/lib/validation/validaterequest";
import { NextRequest, NextResponse } from "next/server";
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
  // Build the data object conditionally
  if (fileUrl){

  const roleField = user.role === "ENSEIGNANT" ? "teacher" : user.role === "ADMIN" ? "admin" : null;

  const data: any = {
    title: title,
    body: body,
    classId: classId,
    document: {
      create: {
        name: files.name,
        fileurl: fileUrl,
        filetype: files.type,
      },
    },
    class: {
      connect: {
        id: classId,
      },
    },
  };

  if (roleField) {
    data[roleField] = {
      connect: {
        userId: user.id,
      },
    };
  }

  if (teacherId) {
    data.teacher = {
      connect: {
        userId: teacherId,
      },
    };
  }

  try {
    const newNews = await prisma.news.create({
      data: data,
    });
    
    if (user.role === "ADMIN") {
      // Send email to all students in the class
      const students = await prisma.student.findMany({
        where: { classId: classId },
        include: { user: true,
          parent:{
            include:{
              user:true,
            }
          }
         }, // Assuming the student table has a relation to the user table where email is stored
      });
    
      // Send email to the teacher
      const teacher = await prisma.teacher.findUnique({
        where: { userId: teacherId },
        include: { user: true ,
          
        }, // Assuming the teacher table has a relation to the user table where email is stored
      });
    
      const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <h1 style="text-align: center; color: #333;">Nouveau Message - ${title}</h1>
            
            <p>${body}</p>
            
            <p>Merci de consulter votre espace pour plus de détails et informations complémentaires concernant cette actualité.</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            
            <p style="font-size: 12px; color: #999; text-align: center;">
              Ceci est un message automatique. Merci de ne pas répondre à cet email.
            </p>
          </div>
        </body>
      </html>
    `;

      // Assuming `students` is an array of student objects and each student has a parent object with user email.
      const emailPromises = students.flatMap((student:any) => {
        const studentEmailPromise = sendEmail(
          student.user.email,
          `Nouveau Message dans votre classe`,
          emailContent
        );

      // Check if the student has a parent and create a promise to send the email to the parent as well
      const parentEmailPromise = student.parent 
        ? sendEmail(
            student.parent.user.email,
            `Nouveau Message concernant votre enfant`,
            emailContent
          )
        : null;

      return [studentEmailPromise, parentEmailPromise].filter(Boolean);
    });
    
      // Include teacher in the email list if they exist
      if (teacher) {
        emailPromises.push(
          sendEmail(
            teacher.user.email,
            `Nouveau Message dans votre classe`,
            emailContent
          )
        );
      }
    
      // Await all email promises
      try {
        await Promise.all(emailPromises);
        console.log("Emails sent successfully");
      } catch (error) {
        console.error("Error sending emails:", error);
      }
    }
        
    return NextResponse.json(newNews, { status: 200 });

  } catch (error) {
    console.error("Error sending email or creating news:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
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
        newsId: id,
      },
    });
    const news = await prisma.news.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the matiere" },
      { status: 500 }
    );
  }
}
