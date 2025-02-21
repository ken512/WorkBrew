/*
  Warnings:

  - The `wifiSpeed` column on the `Cafe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `wifiStability` column on the `Cafe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `seatAvailability` column on the `Cafe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Cafe" DROP COLUMN "wifiSpeed",
ADD COLUMN     "wifiSpeed" "WifiSpeed",
DROP COLUMN "wifiStability",
ADD COLUMN     "wifiStability" "WifiStability",
DROP COLUMN "seatAvailability",
ADD COLUMN     "seatAvailability" "SeatAvailability";
