-- DropForeignKey
ALTER TABLE "Remark" DROP CONSTRAINT "Remark_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Remark" DROP CONSTRAINT "Remark_subjectId_fkey";

-- AlterTable
ALTER TABLE "Remark" ALTER COLUMN "subjectId" DROP NOT NULL,
ALTER COLUMN "studentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
