-- CreateTable
CREATE TABLE "Mapel" (
    "id" SERIAL NOT NULL,
    "mapel" TEXT NOT NULL,

    CONSTRAINT "Mapel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materi" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "lesson" TEXT NOT NULL,
    "mapelId" INTEGER,

    CONSTRAINT "Materi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Materi" ADD CONSTRAINT "Materi_mapelId_fkey" FOREIGN KEY ("mapelId") REFERENCES "Mapel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
