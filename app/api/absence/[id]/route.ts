import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
   
    if (!params.id) {
      return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
    }
    const id = parseInt(params.id);
    try {
      // Check if the student exists
      const absence = await prisma.absence.findUnique({ where: { id: id } });
  
      if (!absence) {
        return NextResponse.json({ error: "absence not found" }, { status: 404 });
      }

      // Delete the absence
      await prisma.absence.delete({ where: { id: id } });
  
      return NextResponse.json({ message: "absence and related parent deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting student:", error);
      return NextResponse.json({ error: "An error occurred while deleting the student" }, { status: 500 });
    }
  }
  