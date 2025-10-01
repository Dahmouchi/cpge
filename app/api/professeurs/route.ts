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
  const allProfessors = await prisma.teacher.findMany({
    include: {
      user: true,
      classes: true,
      remarks:true,
    },
  });

  if (!allProfessors) {
    return NextResponse.json({ error: "No classes found" }, { status: 404 });
  }

  if (allProfessors.length === 0) {
    return NextResponse.json({ message: "No classes found" }, { status: 404 });
  }

  return NextResponse.json(allProfessors, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, classes,phone,adress } = await req.json();

  const allProfessors = await prisma.user.findMany({
    where: {
      email: email,
    },
  });

  if (allProfessors.length > 0) {
    return NextResponse.json({ error: "Email already exists" }, { status: 404 });
  }
  
  const newProfessor = await prisma.teacher.create({
    data: {
      user: {
        create: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: email,
          phone:phone,
          address:adress,
          role: "ENSEIGNANT",
          statut: false,
          password: "",
        },
      },
      classes: {
        connect: [
          ...classes.map((item: any) => ({ id: item.value })),
        ],
      },
      champMatier:"not yet",
    },
  });

  const newToken = await prisma.invite.create({
    data: {
      userId: newProfessor.userId,
      code: Math.random().toString(36).substring(2),
    },
  });

  try {
    await sendEmail(email,`Confirmation d'inscription - CPGE Ibn EL Khatib`, generateInviteEmail(newToken.code));
  } catch (error) {
    return NextResponse.json({ error: "Error sending invitation email" }, { status: 500 });
  }
  
  return NextResponse.json(newProfessor, { status: 201 });
  
}