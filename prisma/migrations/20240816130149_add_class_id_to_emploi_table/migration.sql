/*
  Warnings:

  - You are about to drop the column `type` on the `Content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Emploi" ADD COLUMN     "classId" TEXT;

-- DropEnum
DROP TYPE "Type";
