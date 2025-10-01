-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_classId_fkey";

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
