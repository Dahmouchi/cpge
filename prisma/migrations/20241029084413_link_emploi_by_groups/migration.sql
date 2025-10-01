-- AlterTable
ALTER TABLE "Emploi" ADD COLUMN     "groupId" TEXT;

-- CreateTable
CREATE TABLE "_groupEmploi" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_groupEmploi_AB_unique" ON "_groupEmploi"("A", "B");

-- CreateIndex
CREATE INDEX "_groupEmploi_B_index" ON "_groupEmploi"("B");

-- AddForeignKey
ALTER TABLE "_groupEmploi" ADD CONSTRAINT "_groupEmploi_A_fkey" FOREIGN KEY ("A") REFERENCES "Emploi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groupEmploi" ADD CONSTRAINT "_groupEmploi_B_fkey" FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
