-- DropForeignKey
ALTER TABLE "Absence" DROP CONSTRAINT "Absence_classId_fkey";

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
