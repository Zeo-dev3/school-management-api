-- CreateEnum
CREATE TYPE "Kelas" AS ENUM ('KELAS_10_SMA', 'KELAS_11_SMA', 'KELAS_12_SMA');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "pin" INTEGER NOT NULL,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "credit_score" INTEGER NOT NULL DEFAULT 100,
    "alamat" TEXT,
    "kelas" "Kelas" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
