"use server";

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    if (!id) {
        return NextResponse.json(
            { error: "Matiere ID is required" },
            { status: 400 }
        );
    }
    try {
        const matiere = await prisma.grade.delete({
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

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } } // id is a string from the URL
  ) {
    try {
      const id = parseInt(params.id, 10); // Convert id to a number
  
      if (isNaN(id)) {
        return NextResponse.json(
          { error: "Grade ID is invalid or missing" },
          { status: 400 }
        );
      }
  
      const { value,classement,maxmin } = await req.json();
      
      // Ensure that the value is valid
      if (value === undefined || value === null ) {
        return NextResponse.json(
          { message: "no change" },
          { status: 200 }
        ); // Ensure that value is being updated
      }
      const note = parseFloat(value)
      // Update the grade with the new value
      await prisma.grade.update({
        where: { id: id },
        data: { 
            value:note,
            classement:parseInt(classement),
            maxmin,
         }, // Ensure that value is being updated
      });
  
      return NextResponse.json(
        { message: "Grade updated successfully" },
        { status: 200 }
      );
  
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "An error occurred while updating the grade" },
        { status: 500 }
      );
    }
  }