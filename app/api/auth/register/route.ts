import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    if (
      typeof username !== "string" ||
      username.length < 3 ||
      username.length > 31 ||
      !/^[a-z0-9_-]+$/.test(username)
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

    const userId = generateIdFromEntropySize(10); // 16 characters long

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (user) {
      return new NextResponse("Cet utilisateur existe deja", { status: 500 });
    }

    await prisma.user.create({
      data: {
        id: userId,
        username: username,
        password: password,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return new NextResponse("Utilisateur inscrit avec succès", { status: 200 });
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
