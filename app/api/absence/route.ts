import sendEmail from '@/actions/sendemail';
import prisma from '@/lib/prisma'; // Make sure you have Prisma set up
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { date, classId, subjectId, content, studentId, teacherId, contentA, type, statu, justification } = await req.json();

  // Validate the required fields
  if (!classId || !subjectId || !studentId) {
    return NextResponse.json(
      { error: "Le nom de la matière est requis" },
      { status: 400 }
    );
  }

  const cnt = content ? content : "toute la journée";
  
  try {
    // Create absence entry in the database
    const absence = await prisma.absence.create({
      data: {
        date: new Date(date),
        classId,
        subjectId,
        content: cnt,
        studentId,
        teacherId,
        contentA,
        type,
        statu,
        justification,
      },
    });

    if (studentId) {
      // Fetch student and parent details
      const students = await prisma.student.findUnique({
        where: { id: studentId },
        include: {
          user: true,
          parent: {
            include: {
              user: true,
            },
          },
        },
      });

      const emailContent = `
       <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <h1 style="text-align: center; color: #333;">Nouveau Message - Absence</h1>
            
            <p>Bonjour,</p>
            
            <p>Nous avons constaté que vous avez été absent(e) le <strong>${new Date(date).toLocaleDateString()}</strong>.</p>
            
            <p style="margin-top: 20px;">Merci de consulter votre espace étudiant pour plus de détails ou pour justifier votre absence, si nécessaire.</p>
            
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

      const emailParent = `
       <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
              <h1 style="text-align: center; color: #333;">Nouveau Message - Absence</h1>
              
              <p>Bonjour M./Mme ${students?.parent?.user.firstName} ${students?.parent?.user.lastName},</p>
              
              <p>Nous vous informons que ${students?.user.firstName} ${students?.user.lastName} a été absent(e) le <strong>${new Date(date).toLocaleDateString()}</strong>.</p>
              
              <p style="margin-top: 20px;">Merci de consulter votre espace parent pour plus de détails ou pour suivre la situation.</p>
              
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

    return NextResponse.json(
      { message: 'Absence ajoutée avec succès', absence },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
