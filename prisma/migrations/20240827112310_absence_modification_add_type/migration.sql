-- AlterTable
ALTER TABLE "Absence" ADD COLUMN     "contentA" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Absence';
