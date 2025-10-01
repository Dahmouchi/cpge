/*
  Warnings:

  - The `groupId` column on the `Emploi` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Emploi" DROP COLUMN "groupId",
ADD COLUMN     "groupId" INTEGER;
