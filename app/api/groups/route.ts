import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const allClasses = await prisma.group.findMany({});
  
    if (!allClasses) {
      return NextResponse.json({ error: "No classes found" }, { status: 404 });
    }
  
    if (allClasses.length === 0) {
      return NextResponse.json({ message: "No classes found" }, { status: 404 });
    }
  
    return NextResponse.json(allClasses, { status: 200 });
  }

  