/*
  Warnings:

  - A unique constraint covering the columns `[supabaseUserId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supabaseUserId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cafe" ALTER COLUMN "openingTime" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "closingHours" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "supabaseUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_supabaseUserId_key" ON "Users"("supabaseUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userName_key" ON "Users"("userName");
