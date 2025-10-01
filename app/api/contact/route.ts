import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/actions/sendemail";

export async function POST(req: NextRequest) {
  try {
    const { email, phone, subject, message, fullName } = await req.json();

    // Validate input
    if (!email || !phone || !subject || !message || !fullName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    // Create email content
    const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <h1 style="text-align: center; color: #333;">${subject}</h1>
            <p>Envoyé par : ${fullName}</p>
            <p>Téléphone : ${phone}</p>
            <p>Email : ${email}</p>
            <p>Message : ${message}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          </div>
        </body>
      </html>
    `;

    // Send email
    await sendEmail(
      "contact@cpgeibnelkhatib.com",
      `Nouveau message`,
      emailContent
    );

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
