import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma"; // Adjust the import based on your Prisma setup
import sendEmail from "@/actions/sendemail";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  
  // Extract query parameters
  const subjectId = searchParams.get('subjectId');
  const type = searchParams.get('type');
  const trim = searchParams.get('trim');
  const nbr = searchParams.get('nbr');

  try {
    // Build the Prisma query filters
    const filters: any = {
      subjectId: Number(subjectId)|| undefined,
      type: type || undefined,
      trim: trim || undefined,
      numero: Number(nbr) || 1,
    };

    // Fetch the filtered grades from the database
    const grades = await prisma.grade.findMany({
      where: filters,
      include: {
        student: {
          include: {
            user: true, // Assuming you want to include student user details
          },
        },
      },
      orderBy:{
        value:"desc",
      }
    });

    if (!grades || grades.length === 0) {
      return NextResponse.json({ message: 'No grades found' }, { status: 404 });
    }

    // Return the fetched grades
    return NextResponse.json(grades, { status: 200 });
  } catch (error) {
    console.error('Error fetching filtered grades:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  const { subjectId, studentId, type, value, trim,etat ,absent ,etatJust ,number} = await req.json();

  if (!subjectId || !studentId || !type || !trim) {
    return NextResponse.json({ error: "Subject ID, student ID, type, value, and term are required" }, { status: 400 });
  }

  // Create the new grade
  const newGrad = await prisma.grade.create({
    data: {
      studentId,
      subjectId,
      type,
      value,
      trim,
      ...etat && { etat },
      ...absent && { absent },
      ...etatJust && { etatJust },
      ...number && { numero: number },
    },
  });

  // Fetch student and parent details
  const student = await prisma.student.findUnique({
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

  // Define email content
  const emailContentStudent = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <h1 style="text-align: center; color: #333;">Nouveau Message - ${trim} notes ajoutées</h1>
          <p>Bonjour ${student?.user.firstName},</p>
          <p>Vous avez reçu de nouvelles notes pour le trimestre ${trim} dans votre espace. Veuillez consulter votre espace pour plus de détails.</p>
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
          <h1 style="text-align: center; color: #333;">Nouveau Message - ${trim} notes ajoutées</h1>
          <p>Bonjour ${student?.parent?.user.firstName},</p>
          <p>Nous souhaitons vous informer que votre enfant, ${student?.user.firstName} ${student?.user.lastName}, a reçu de nouvelles notes pour le trimestre ${trim}. Veuillez consulter votre espace pour plus de détails.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">
            Ceci est un message automatique. Merci de ne pas répondre à cet email.
          </p>
        </div>
      </body>
    </html>
  `;

  // Send emails
  if (student?.user.email) {
    await sendEmail(
      student.user.email,
      `Nouveau Message: Notes ajoutées pour ${trim}`,
      emailContentStudent
    );
  }

  if (student?.parent?.user.email) {
    await sendEmail(
      student.parent.user.email,
      `Nouveau Message: Notes ajoutées pour ${trim}`,
      emailContentParent
    );
  }

  return NextResponse.json(newGrad, { status: 201 });
}
