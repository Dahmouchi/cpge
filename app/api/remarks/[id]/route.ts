import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
    const remId=parseInt(id);
    try {
        const matiere = await prisma.remark.delete({
            where: {
                id: remId,
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