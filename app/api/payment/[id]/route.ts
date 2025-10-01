// pages/api/installments/[paymentAgreementId].ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma"; // Adjust the import based on your Prisma setup

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const  paymentAgreementId  = parseInt(params.id);

  if (!paymentAgreementId) {
    return NextResponse.json({ error: `Payment Agreement ID is required ${params.id}` }, { status: 400 });
  }

  // Retrieve installments for the given payment agreement
  const installments = await prisma.installment.findMany({
    where: { paymentAgreementId: paymentAgreementId },
    orderBy:{
      createdAt:"desc"
    }
  });

  if (!installments.length) {
    return NextResponse.json({ error: "No installments found" }, { status: 201 });
  }

  return NextResponse.json(installments, { status: 200 });
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (!id) {
    return NextResponse.json({ error: "Installment ID is required" }, { status: 400 });
  }

  try {
    // Check if the installment exists
    const installment = await prisma.installment.findUnique({ where: { id: id } });
    if (!installment) {
      return NextResponse.json({ error: "Installment not found" }, { status: 404 });
    }

    // Retrieve the related payment agreement
    const paymentAgreement = await prisma.paymentAgreement.findUnique({
      where: { id: installment.paymentAgreementId }
    });

    if (!paymentAgreement) {
      return NextResponse.json({ error: "Payment Agreement not found" }, { status: 404 });
    }

    // Calculate the new remaining amount
    const newRemainingAmount = paymentAgreement.remainingAmount + installment.amount;

    // Update the remaining amount in the payment agreement
    await prisma.paymentAgreement.update({
      where: { id: installment.paymentAgreementId },
      data: { remainingAmount: newRemainingAmount },
    });

    // Delete the installment
    await prisma.installment.delete({ where: { id: id } });

    return NextResponse.json({ message: "Installment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting installment:", error);
    return NextResponse.json({ error: "An error occurred while deleting the installment" }, { status: 500 });
  }
}