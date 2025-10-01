// pages/api/installments.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma"; // Adjust the import based on your Prisma setup

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { totalAmount, avanceAmount, studentId } = await req.json();

    // Validate input
    if (!totalAmount || !avanceAmount || !studentId) {
      return NextResponse.json({ error: "Total amount, advance amount, and student ID are required ${total} ${advance} ${id}" }, { status: 400 });
    }

    // Parse values
    const total = parseFloat(totalAmount);
    const advance = parseFloat(avanceAmount);
    const id = parseInt(studentId);

    if (isNaN(total) || isNaN(advance) || isNaN(id)) {
      return NextResponse.json({ error: `Invalid numeric values provided ` }, { status: 401 });
    }

    // Create the new payment agreement
    const newPaymentAgreement = await prisma.paymentAgreement.create({
      data: {
        totalAmount: total,
        advanceAmount: advance,
        remainingAmount: total - advance,
        studentId: id,
      },
    });

    // Respond with the created payment agreement
    return NextResponse.json(newPaymentAgreement, { status: 201 });

  } catch (error) {
    console.error("Error creating payment agreement:", error);
    return NextResponse.json({ error: "An error occurred while creating the payment agreement" }, { status: 500 });
  }
}
