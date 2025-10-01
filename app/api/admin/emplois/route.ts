"use server";

import sendEmail from "@/actions/sendemail";
import prisma from "@/lib/prisma";
import { getFileUrl, uploadFile } from "@/lib/r2";
import { validateRequest } from "@/lib/validation/validaterequest";
import { NextRequest, NextResponse } from "next/server";
import mime from "mime";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const formData = await req.formData();

  const description:any = formData.get("body")?.toString();
  const name:any = formData.get("title")?.toString();
  const teacherId:any = formData.get("teacherId")?.toString();
  const files: File = formData.get("files") as File;
  const bytes = await files.arrayBuffer();
  const buffer = Buffer.from(bytes)
  const ii = parseInt(teacherId);
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json(
      { error: "Authentification requise" },
      { status: 400 }
    );
  }

  if (!teacherId) {
    return NextResponse.json(
      { error: "Teacher ID is required" },
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

  if(fileUrl){
  // Create new emploi (schedule) in the database
  const newEmploi = await prisma.emploi.create({
    data: {
      name,
      description,
      teacherId:ii,
      document: {
        create: {
          name:filename,
          fileurl:fileUrl,
          filetype:files.type,
        },
      },
    },
  });

  // Find teacher information to send email
  const teacher = await prisma.teacher.findUnique({
    where: { id: ii },
    include: { user: true },
  });

  if (teacher?.user?.email) {
    const emailContent = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <h1 style="text-align: center; color: #333;">Nouveau Message - Emploi de Temps</h1>
          <p>Bonjour M./Mme ${teacher.user.firstName} ${teacher.user.lastName},</p>
          <p>Nous vous informons qu'il y a eu une mise à jour dans l'emploi de temps :</p>
          <p><strong>${name}</strong></p>
          <p>${description}</p>
          <p>Merci de consulter votre espace pour plus de détails.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">
            Ceci est un message automatique. Merci de ne pas répondre à cet email.
          </p>
        </div>
      </body>
    </html>
    `;

    // Send email notification
    await sendEmail(
      teacher.user.email,
      `Nouveau Message dans votre classe`,
      emailContent
    );
  }

  // Return the created emploi
  return NextResponse.json(newEmploi, { status: 200 });

  }
  
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong during the process." },
      { status: 500 }
    );
  }
}
