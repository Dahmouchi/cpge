/*
  Warnings:

  - You are about to drop the column `code` on the `Invite` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Invite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_userId_fkey";

-- DropIndex
DROP INDEX "Invite_code_key";

-- DropIndex
DROP INDEX "Invite_userId_key";

-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "code",
DROP COLUMN "userId",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "token" TEXT,
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Invite_email_key" ON "Invite"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_token_key" ON "Invite"("token");
