-- CreateEnum
CREATE TYPE "Type" AS ENUM ('COUR', 'TP', 'NEWS', 'EMPLOI');

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'COUR';
