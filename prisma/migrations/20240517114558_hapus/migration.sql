/*
  Warnings:

  - You are about to drop the column `kelas` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "kelas";

-- DropTable
DROP TABLE "Message";
