-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_adminId_fkey";

-- AlterTable
ALTER TABLE "Content" ALTER COLUMN "adminId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
