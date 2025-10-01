/*
  Warnings:

  - The primary key for the `Invite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Invite` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Invite` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Invite` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Invite` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Invite` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `Invite` table. All the data in the column will be lost.
  - The `id` column on the `Invite` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Invite_email_key";

-- DropIndex
DROP INDEX "Invite_token_key";

-- AlterTable
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "expiresAt",
DROP COLUMN "name",
DROP COLUMN "token",
DROP COLUMN "used",
ADD COLUMN     "code" TEXT,
ADD COLUMN     "userId" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Invite_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "InviteEtud" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InviteEtud_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InviteEtud_email_key" ON "InviteEtud"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InviteEtud_token_key" ON "InviteEtud"("token");
