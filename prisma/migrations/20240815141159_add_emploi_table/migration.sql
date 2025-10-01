-- AlterTable
ALTER TABLE "File" ADD COLUMN     "emploiId" TEXT;

-- CreateTable
CREATE TABLE "Emploi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Emploi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassEmploi" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassEmploi_AB_unique" ON "_ClassEmploi"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassEmploi_B_index" ON "_ClassEmploi"("B");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_emploiId_fkey" FOREIGN KEY ("emploiId") REFERENCES "Emploi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassEmploi" ADD CONSTRAINT "_ClassEmploi_A_fkey" FOREIGN KEY ("A") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassEmploi" ADD CONSTRAINT "_ClassEmploi_B_fkey" FOREIGN KEY ("B") REFERENCES "Emploi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
