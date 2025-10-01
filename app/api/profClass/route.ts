import sendEmail from '@/actions/sendemail';
import  prisma  from '@/lib/prisma'; // Make sure you have Prisma set up
import { NextRequest ,NextResponse} from 'next/server';

export  async function POST(req: NextRequest) {
  
    const { date, classId, subjectId, content, teacherId,contentA,type,statu,justification  } = await req.json();

      // Validate the required fields
      if ( !classId || !subjectId || !teacherId) {
        return NextResponse.json(
          { error: "Le nom de la matière est requis" },
          { status: 400 }
        );
      }

      try{
        const absence = await prisma.absence.create({
          data: {
            date: new Date(date),
            classId,
            subjectId,
            content,
            teacherId,
            contentA,
            type,
            statu,
            justification,
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
                  <h1 style="text-align: center; color: #333;">Nouveau Message - Absence</h1>
                  
                  <p>Bonjour,</p>
                  
                  <p>Nous vous informons que l'élève <strong>${students?.user.firstName} ${students?.user.lastName}</strong> a été absent(e) le <strong>${new Date(date).toLocaleDateString()}</strong>.</p>
                  
                  <p>Merci de consulter votre espace enseignant pour plus de détails et pour suivre la situation de l'élève.</p>
                  
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
      
         sendEmail(
            students?.user.email, 
            `Nouveau Message dans votre classe`, 
            emailContent
          );
        }
      // Create the absence entry in the database
        return NextResponse.json(
          { message: 'Matière ajoutée avec succès', absence },
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
