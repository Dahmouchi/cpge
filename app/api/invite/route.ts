// pages/api/sendInvite.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust based on your Prisma setup
import sendEmail from "@/actions/sendemail"; // Function to send emails

export async function POST(req: NextRequest) {
  const { email,name } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Create an invite in the database
    const invite = await prisma.inviteEtud.create({
      data: {
        name,
        email,
        token: crypto.randomUUID(), // Generate a unique token for the invite
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // Invite expires in 24 hours
      },
    });

    // Send email with the invite link
    const inviteLink = `https://cpgeibnelkhatib.com/cours/${invite.token}`;
    const emailContent = `
      <html>
        <body>
          <div>
            <h1>Invitation à consulter les vidéos</h1>
            <p>Bonjour ${name} Veuillez cliquer sur le lien suivant pour accéder aux vidéos :</p>
            <a href="${inviteLink}">${inviteLink}</a>
          </div>
        </body>
      </html>
    `;

    await sendEmail(email, "Votre invitation pour accéder aux vidéos", emailContent);

    return NextResponse.json({ message: "Invitation sent!" }, { status: 200 });
  } catch (error) {
    console.error("Error generating invite:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
