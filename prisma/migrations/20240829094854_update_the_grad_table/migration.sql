/*
  Warnings:

  - You are about to drop the column `colle` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `concoursBlanc` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `dl` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `ds` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `finalGrade` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `tipe` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `tp` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the `Coefficient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Coefficient" DROP CONSTRAINT "Coefficient_subjectId_fkey";

-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "colle",
DROP COLUMN "concoursBlanc",
DROP COLUMN "dl",
DROP COLUMN "ds",
DROP COLUMN "finalGrade",
DROP COLUMN "tipe",
DROP COLUMN "tp",
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Coefficient";
