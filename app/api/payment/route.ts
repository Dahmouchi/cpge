// pages/api/installments.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma"; // Adjust the import based on your Prisma setup

export async function POST(req: NextRequest) {
  const { paymentAgreementId, amount,type } = await req.json();

  if (!paymentAgreementId || !amount) {
    return NextResponse.json({ error: "Payment Agreement ID and amount are required" }, { status: 400 });
  }

  // Find the payment agreement to verify it exists
  const paymentAgreement = await prisma.paymentAgreement.findUnique({
    where: { id: paymentAgreementId },
  });

  if (!paymentAgreement) {
    return NextResponse.json({ error: "Payment Agreement not found" }, { status: 400 });
  }

  // Create the new installment
  const newInstallment = await prisma.installment.create({
    data: {
      paymentAgreementId: paymentAgreementId,
      amount: amount,
      paymentDate: new Date(),
      type,
    },
  });

  // Update remaining amount in the payment agreement
  await prisma.paymentAgreement.update({
    where: { id: paymentAgreementId },
    data: {
      remainingAmount: paymentAgreement.remainingAmount - amount,
    },
  });

  return NextResponse.json(newInstallment, { status: 201 });
}
