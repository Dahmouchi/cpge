-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_subjectId_fkey";

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
