"use server";
import prisma from "@/lib/prisma";
import sendEmail from "./sendemail";

export async function SendForm(formData: FormData) {
  const firstName = String(formData.get("firstName"));
  const lastName = String(formData.get("lastName"));
  const email = String(formData.get("email"));
  const phone = String(formData.get("phone"));
  const notes = "";
  const status = "pending";

  try {
    if (typeof email !== "string") {
      throw new Error("L'email est invalide.");
    }
    if (typeof firstName !== "string") {
      throw new Error(
        "Une erreur est survenue, veuillez rentrer correctement les champs."
      );
    }
    if (typeof lastName !== "string") {
      throw new Error(
        "Une erreur est survenue, veuillez rentrer correctement les champs."
      );
    }
    if (typeof phone !== "string") {
      throw new Error(
        "Une erreur est survenue, veuillez rentrer correctement les champs."
      );
    }
    if (!email) {
      throw new Error("Certains champs sont vides");
    } else if (!isValidEmail(email)) {
      throw new Error("Invalid email format");
    }
    const subject = "Preinscription CPGE IBN EL KHATIB";
    const html = `<p>Nom : ${firstName}</p><p>Prenom : ${lastName}</p><p>Email : ${email}</p><p>Numero : ${phone}</p>`;
    await sendEmail("contact@cpgeibnelkhatib.com", subject, html);
    await prisma.form.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        notes,
        status,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
