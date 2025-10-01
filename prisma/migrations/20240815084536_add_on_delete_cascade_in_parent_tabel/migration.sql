-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_studentId_fkey";

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
