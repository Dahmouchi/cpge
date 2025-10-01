import sendEmail from "@/actions/sendemail";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function generateInviteEmail(code: any): string {
  const html = `
    <html>
      <body>
        <div>
          <h1>Vous avez reçu une invitation</h1>
          <h2>
            Cliquez sur le lien ci-dessous pour continuer la création de votre compte
          </h2>
          <a href="https://cpge.vercel.app/admin/invite/${code}">Cliquez ici</a>
          <h3>Si vous n'avez pas fait cette requête, veuillez ignorer cet email</h3>
        </div>
      </body>
    </html>
  `;
  return html;
}


export async function GET() {
  const allStudents = await prisma.student.findMany({
    include: {
      user: true,
      class: true,
      remarks:true,
      parent:{
        include:{
          user:true,
        }
      },
    },
  });

  if (!allStudents) {
    return NextResponse.json({ error: "Aucun étudiant trouvé" }, { status: 404 });
  }

  if (allStudents.length === 0) {
    return NextResponse.json({ message: "Aucun étudiant trouvé" }, { status: 404 });
  }

  return NextResponse.json(allStudents, { status: 200 });
}
export async function POST(req: NextRequest) {
  const { firstName, lastName, phone, address, email, studentClass,  avance, totalPrice, password,group } = await req.json();

  // Check if the email already exists
  const allEtudiants = await prisma.user.findMany({
    where: {
      email: email,
    },
  });

  if (allEtudiants.length > 0) {
    return NextResponse.json({ error: "Email already exists" }, { status: 404 });
  }

  // Create the new student
  const newEtudiant = await prisma.student.create({
    data: {
      user: {
        create: {
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          address: address,
          email: email,
          username: email,
          statut: false,
          password: password,
        },
      },
      class: {
        connect: {
          id: studentClass,
        },
      },
      group:{
        connect:{
          id:parseInt(group),
        }
      }
    },
  });

  
  if(totalPrice || avance){
    // Create the payment agreement for the student
  const newPaymentAgreement = await prisma.paymentAgreement.create({
    data: {
      studentId: newEtudiant.id,
      totalAmount: totalPrice,
      advanceAmount: avance,
      remainingAmount: totalPrice - avance,
    },
  });
  }

  // Create the invitation token
  const newToken = await prisma.invite.create({
    data: {
      userId: newEtudiant.userId,
      code: Math.random().toString(36).substring(2),
    },
  });

  // Send the invitation email
  try {
    await sendEmail(email, `Confirmation d'inscription - CPGE Ibn EL Khatib`, generateInviteEmail(newToken.code));
  } catch (error) {
    return NextResponse.json({ error: "Error sending invitation email" }, { status: 500 });
  }

  return NextResponse.json({ newEtudiant }, { status: 201 });
}
