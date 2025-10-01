// /pages/api/checkToken.js
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma"; // Adjust the import based on your Prisma setup

export async function POST(req: NextRequest){
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }
  try {
    // Find the invite with the provided token
    const invite = await prisma.inviteEtud.findUnique({
      where: {
        token: token,
      },
    });

    // If no invite found or the token has expired/used
    if (!invite || invite.used) {
       return NextResponse.json({ error: 'Invalid or expired token' });
    }

    return NextResponse.json(invite, { status: 201 });

  } catch (error) {
    console.error('Error fetching invite:', error);
    return NextResponse.json({ error: 'Internal server error' },{status:500});
  }
}
