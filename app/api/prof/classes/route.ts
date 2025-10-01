import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
// ) {
//   const allMatieres = await prisma.classes.findMany({
//     include: {
//         students: true
//     }
//   });
//   if (!allMatieres) {
//     return NextResponse.json({ error: "No classes found" }, { status: 404 });
//   }

//   return NextResponse.json(allMatieres, { status: 200 });
// }


export async function GET(req: NextRequest) {
  try {
    const allClasses = await prisma.classes.findMany({
      include: {
        students: {
          include: {
            user: true, // Include the user information for each student
          },
        },
      },
    });

    if (!allClasses || allClasses.length === 0) {
      return NextResponse.json({ error: "No classes found" }, { status: 404 });
    }

    return NextResponse.json(allClasses, { status: 200 });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}