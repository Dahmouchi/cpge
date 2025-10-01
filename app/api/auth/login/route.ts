"use server";
import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (
      typeof username !== "string" ||
      username.length < 3 ||
      username.length > 31
    ) {
      return new NextResponse("Internal Error", { status: 500 });
    }
    if (
      typeof password !== "string" ||
      password.length < 6 ||
      password.length > 255
    ) {
      return new NextResponse("Internal Error", { status: 500 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email:username.toLowerCase(),
      },
    });
    if (!existingUser) {
      // NOTE:
      // Returning immediately allows malicious actors to figure out valid usernames from response times,
      // allowing them to only focus on guessing passwords in brute-force attacks.
      // As a preventive measure, you may want to hash passwords even for invalid usernames.
      // However, valid usernames can be already be revealed with the signup page among other methods.
      // It will also be much more resource intensive.
      // Since protecting against this is non-trivial,
      // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
      // If usernames are public, you may outright tell the user that the username is invalid.
      return new NextResponse("Le login ou mot de pass sont invalides.", { status: 500 });
    }

    if (!(existingUser.password === password)) {
      return new NextResponse("Le login ou mot de pass sont invalides.", { status: 500 });
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new NextResponse("Connecté avec succès", { status: 200 });
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
