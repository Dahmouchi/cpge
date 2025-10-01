/*
  Warnings:

  - You are about to drop the column `image` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "postId" INTEGER;

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "image",
ALTER COLUMN "handle" DROP NOT NULL,
ALTER COLUMN "body" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
