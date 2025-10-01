"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation/validaterequest";
import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/actions/sendemail";
import { getFileUrl, uploadFile } from "@/lib/r2";
import mime from "mime";

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
  const formData = await req.formData();
  const classId:any = formData.get("classId")?.toString();
  const description:any = formData.get("body")?.toString();
  const name:any = formData.get("title")?.toString();
  const groupId:any = formData.get("groupId")?.toString();
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

  if (!classId) {
    return NextResponse.json(
      { error: "Class ID is required" },
      { status: 400 }
    );
  }


  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${files.name.replace(
    /\.[^/.]+$/,
    ""
  )}-${uniqueSuffix}.${mime.getExtension(files.type)}`;

  try {
    
    await uploadFile(buffer, filename, files.type);

    // Get the URL of the uploaded file
    const fileUrl =  getFileUrl(filename);
    if (fileUrl){
       
    const newEmploi = await prisma.emploi.create({
      data: {
        name,
        description,
        classId,
        groupId : parseInt(groupId),
        document: {
          create: {
            name:filename,
            fileurl:fileUrl,
            filetype:files.type,
          },
        },
        classes:{
          connect:[{ id: classId}],
        },
        goups: {
          connect: [{ id: parseInt(groupId) }],
        },
       
      },
      });
      // Now, send an email to all students in the class
      const students = await prisma.student.findMany({
        where: { 
          classId: classId,
          groupId: parseInt(groupId), 
        },
        include: { 
          user: true,
          parent: {
            include: {
              user: true,
            },
          },
        },
      });
      
      
      // Create an array of promises to send emails to both students and parents
      const emailPromises = students.flatMap((student:any) => {
      const emailContentStudent = `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
              <h1 style="text-align: center; color: #333;">Mise à jour: Emploi du temps - ${name}</h1>
              
              <p>Bonjour,</p>
              
              <p>Nous vous informons d'un nouveau message concernant votre emploi du temps pour la classe de <strong>${name}</strong>.</p>
              
              <div style="background-color: #e9ecef; padding: 10px; border-radius: 6px; margin-top: 10px;">
                <h2 style="color: #333;">Détails de l'emploi du temps :</h2>
                <p>${description}</p>
              </div>
              
              <p style="margin-top: 20px;">Pour plus de détails, veuillez consulter votre espace étudiant.</p>
              
              <p>Cordialement,</p>
              <p>L'équipe pédagogique</p>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
              
              <p style="font-size: 12px; color: #999; text-align: center;">
                Ceci est un message automatique. Merci de ne pas répondre à cet email.
              </p>
            </div>
          </body>
        </html>
      `;
      
      const emailContentParent = `
       <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
              <h1 style="text-align: center; color: #333;">Nouveau Message: Emploi du temps - ${name}</h1>
              
              <p>Bonjour M./Mme ${student?.parent?.user.firstName} ${student?.parent?.user.lastName},</p>
              
              <p>Nous vous informons que ${student?.user.firstName} ${student?.user.lastName} a reçu un nouveau message concernant son emploi du temps pour la classe de <strong>${name}</strong>.</p>
              
              <div style="background-color: #e9ecef; padding: 10px; border-radius: 6px; margin-top: 10px;">
                <h2 style="color: #333;">Détails de l'emploi du temps :</h2>
                <p>${description}</p>
              </div>
              
              <p style="margin-top: 20px;">Pour plus de détails, veuillez consulter votre espace parent.</p>
              
              <p>Cordialement,</p>
              <p>L'équipe pédagogique</p>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
              
              <p style="font-size: 12px; color: #999; text-align: center;">
                Ceci est un message automatique. Merci de ne pas répondre à cet email.
              </p>
            </div>
          </body>
        </html>
      
      `;
      
      // Create email promises for student and parent
      const studentEmailPromise = sendEmail(
        student.user.email, 
        `Nouveau Message dans votre classe`, 
        emailContentStudent
      );
      
      const parentEmailPromise = student?.parent?.user?.email 
        ? sendEmail(
            student.parent.user.email, 
            `Nouveau Message concernant votre enfant`, 
            emailContentParent
          )
        : null; // Handle case where parent email may not exist
      
      // Return both promises (filtering out any null ones)
      return [studentEmailPromise, parentEmailPromise].filter(Boolean);
      });
      
      // Wait for all email promises to resolve
      await Promise.all(emailPromises);
      return NextResponse.json(newEmploi, { status: 200 });

    }else{
      return NextResponse.json({error:"file not upload"}, { status: 501 });

    }
    // Return the file URL to the client
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong: "},
      { status: 500 }
    );
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
