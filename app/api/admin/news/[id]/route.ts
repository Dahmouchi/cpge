"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation/validaterequest";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;

    try {
        const allNews = await prisma.news.findMany({
            where: {
                classId: id, // Correctly using the id variable
            },
            include: {
               document:true,
               admin: {
                include: {
                  user: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                    },
                  },
                },
              },
              teacher:{
                include:{
                  user:true
                }
              },
            },
            orderBy: {
              createdAt: 'desc', // Sort by the createdAt field in descending order
          },
        });

        if (!allNews) {
            return NextResponse.json({ error: 'Aucune nouvelle trouvée' }, { status: 401 });
        }
        return NextResponse.json(allNews, { status: 200 });
    } catch (error) {
        console.error("Error fetching news:", error);
        return NextResponse.json({ error: "An error occurred while fetching the news" }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: any }
  ) {
    const id = params.id;
    const { title, body, document, teacher, admin } = await req.json();
    const { user } = await validateRequest();
  
    if (!user) {
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 401 }
      );
    }
  
    if (!body) {
      return NextResponse.json(
        { error: "Body is required" },
        { status: 400 }
      );
    }
  
    try {
      // Prepare the data object
      const data: any = {
        title: title,
        body: body,
        admin: admin,
        classId: id,
        class: {
          connect: {
            id: id,
          },
        },
      };
  
      // Conditionally include document if it is provided
      if (document) {
        data.document = document;
      }
  
      // Conditionally include teacher if it is provided
      if (teacher) {
        data.teacher = {
          connect: {
            userId: teacher,
          },
        };
      }
  
      // Create the new news item
      const matiere = await prisma.news.create({
        data: data,
      });
  
      return NextResponse.json(matiere, { status: 200 });
  
    } catch (error) {
      return NextResponse.json(
        { error: "An error occurred" },
        { status: 500 }
      );
    }
  }
  

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    if (!id) {
        return NextResponse.json(
            { error: "Matiere ID is required" },
            { status: 400 }
        );
    }
    try {
        const matiere = await prisma.news.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json(matiere, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "An error occurred while deleting the matiere" },
            { status: 500 }
        );
    }
}
