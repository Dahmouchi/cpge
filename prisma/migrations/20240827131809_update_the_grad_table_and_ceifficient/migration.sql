/*
  Warnings:

  - You are about to drop the column `value` on the `Grade` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_subjectId_fkey";

-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "value",
ADD COLUMN     "colle" DOUBLE PRECISION,
ADD COLUMN     "concoursBlanc" DOUBLE PRECISION,
ADD COLUMN     "dl" DOUBLE PRECISION,
ADD COLUMN     "ds" DOUBLE PRECISION,
ADD COLUMN     "finalGrade" DOUBLE PRECISION,
ADD COLUMN     "tipe" DOUBLE PRECISION,
ADD COLUMN     "tp" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Coefficient" (
    "id" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "concoursBlanc" DOUBLE PRECISION NOT NULL,
    "ds" DOUBLE PRECISION NOT NULL,
    "tp" DOUBLE PRECISION NOT NULL,
    "tipe" DOUBLE PRECISION NOT NULL,
    "colle" DOUBLE PRECISION NOT NULL,
    "dl" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Coefficient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coefficient_subjectId_key" ON "Coefficient"("subjectId");

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coefficient" ADD CONSTRAINT "Coefficient_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
