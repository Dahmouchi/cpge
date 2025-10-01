import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const id = params.id;
  
      if (!id) {
        return NextResponse.json({ error: "Class ID is required" }, { status: 400 });
      }
  
      // Then, delete the class
      await prisma.subject.delete({
        where: { id: parseInt(id) },
      });
  
      return NextResponse.json({ message: "Class and related students deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting class and related students:", error);
      return NextResponse.json({ error: "An error occurred while deleting the class" }, { status: 500 });
    }
  }

  export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const id = parseInt(params.id);
  
      if (!id) {
        return NextResponse.json({ error: "Class ID is required" }, { status: 400 });
      }
  
      const data = await req.json();
  
      const updatedClass = await prisma.subject.update({
        where: { id },
        data: {
          ...data,
        },
      });
  
      return NextResponse.json({ message: "Class updated successfully", updatedClass }, { status: 200 });
  
    } catch (error) {
      console.error("Error updating class:", error);
      return NextResponse.json({ error: "An error occurred while updating the class" }, { status: 500 });
    }
  }