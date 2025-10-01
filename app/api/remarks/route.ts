import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import sendEmail from "@/actions/sendemail";

export async function POST(req: NextRequest) {
    const { remarque,studentId,teacherId,subjectId,sender } = await req.json();
    if (!remarque) {
      return NextResponse.json({ error: "Class is required" }, { status: 400 });
    }
    const createdClass = await prisma.remark.create({
      data: {  
        content: remarque,
        studentId:studentId,
        teacherId:teacherId,
        subjectId:subjectId,
        sender:sender,
      },
    });
    if(teacherId){
      const students = await prisma.teacher.findUnique({
        where: { id: teacherId },
        include: { 
          user: true, 
         }, // Assuming the student table has a relation to the user table where email is stored
      });
      const emailContent = `
       <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <h1 style="text-align: center; color: #333;">Nouveau Message - Nouvelle Remarque</h1>
            
            <p>Bonjour ${students?.user.firstName} ${students?.user.lastName},</p>
            
            <p>Vous avez reçu une nouvelle remarque concernant l'un de vos étudiants. Veuillez consulter votre espace pour plus de détails.</p>
            
            <p>Merci de votre attention.</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            
            <p style="font-size: 12px; color: #999; text-align: center;">
              Ceci est un message automatique. Merci de ne pas répondre à cet email.
            </p>
          </div>
        </body>
      </html>
      `;
  
     sendEmail(
        students?.user.email, 
        `Nouveau Message dans votre classe`, 
        emailContent
      );
    }
   if(studentId){ 
    const students = await prisma.student.findUnique({
      where: { id: studentId },
      include: { 
        user: true,
        parent:{
          include:{
            user:true,
          }
        }
       }, // Assuming the student table has a relation to the user table where email is stored
    });
      const emailContent = `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
              <h1 style="text-align: center; color: #333;">Nouveau Message - Nouvelle Remarque</h1>
              
              <p>Bonjour ${students?.user.firstName} ${students?.user.lastName},</p>
              
              <p>Vous avez reçu une nouvelle remarque. Veuillez consulter votre espace pour plus de détails.</p>
              
              <p>Merci de votre attention.</p>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
              
              <p style="font-size: 12px; color: #999; text-align: center;">
                Ceci est un message automatique. Merci de ne pas répondre à cet email.
              </p>
            </div>
          </body>
        </html>

      `;
        const emailParent = `
       <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
              <h1 style="text-align: center; color: #333;">Nouveau Message - Nouvelle Remarque</h1>
              
              <p>Bonjour M./Mme ${students?.parent?.user.firstName} ${students?.parent?.user.lastName},</p>
              
              <p>Nous vous informons que votre enfant ${students?.user.firstName} ${students?.user.lastName} a reçu une nouvelle remarque. Veuillez consulter son espace pour plus de détails.</p>
              
              <p>Merci de votre attention.</p>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
              
              <p style="font-size: 12px; color: #999; text-align: center;">
                Ceci est un message automatique. Merci de ne pas répondre à cet email.
              </p>
            </div>
          </body>
        </html>
      `;
    // Send email to student
    await sendEmail(
      students?.user.email,
      `Nouveau Message dans votre classe`,
      emailContent
    );

    // Send email to parent
    if (students?.parent?.user.email) {
      await sendEmail(
        students?.parent?.user.email,
        `Nouveau Message`,
        emailParent
      );
    }
   }
    return NextResponse.json(createdClass, { status: 200 });
  }