/*
  Warnings:

  - Made the column `wifiAvailable` on table `Cafe` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `supabaseUserId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cafe" ALTER COLUMN "wifiAvailable" SET NOT NULL;

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "supabaseUserId" TEXT NOT NULL;
