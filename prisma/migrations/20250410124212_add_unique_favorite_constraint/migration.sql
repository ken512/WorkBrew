/*
  Warnings:

  - A unique constraint covering the columns `[userId,cafeId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_cafeId_key" ON "Favorite"("userId", "cafeId");
