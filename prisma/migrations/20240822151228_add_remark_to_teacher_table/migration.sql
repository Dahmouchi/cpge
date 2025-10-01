-- DropForeignKey
ALTER TABLE "Absence" DROP CONSTRAINT "Absence_subjectId_fkey";

-- AlterTable
ALTER TABLE "Absence" ALTER COLUMN "subjectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Remark" ADD COLUMN     "teacherId" INTEGER;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
