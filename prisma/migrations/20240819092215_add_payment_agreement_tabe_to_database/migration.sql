-- CreateTable
CREATE TABLE "PaymentAgreement" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "advanceAmount" DOUBLE PRECISION NOT NULL,
    "remainingAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentAgreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Installment" (
    "id" SERIAL NOT NULL,
    "paymentAgreementId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Installment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentAgreement_studentId_key" ON "PaymentAgreement"("studentId");

-- AddForeignKey
ALTER TABLE "PaymentAgreement" ADD CONSTRAINT "PaymentAgreement_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_paymentAgreementId_fkey" FOREIGN KEY ("paymentAgreementId") REFERENCES "PaymentAgreement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
