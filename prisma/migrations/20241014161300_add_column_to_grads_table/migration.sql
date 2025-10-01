-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "absent" TEXT NOT NULL DEFAULT 'justified',
ADD COLUMN     "etat" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "etatJust" TEXT NOT NULL DEFAULT 'null';
