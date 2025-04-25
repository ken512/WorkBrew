/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Information` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- DropForeignKey
ALTER TABLE "Information" DROP CONSTRAINT "Information_cafeId_fkey";

-- DropForeignKey
ALTER TABLE "Information" DROP CONSTRAINT "Information_userId_fkey";

-- DropIndex
DROP INDEX "Favorite_userId_cafeId_key";

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Information";
