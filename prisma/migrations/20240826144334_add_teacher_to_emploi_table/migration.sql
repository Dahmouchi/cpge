-- AlterTable
ALTER TABLE "Emploi" ADD COLUMN     "teacherId" INTEGER;

-- AddForeignKey
ALTER TABLE "Emploi" ADD CONSTRAINT "Emploi_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
