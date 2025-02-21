-- CreateEnum
CREATE TYPE "WifiSpeed" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "WifiStability" AS ENUM ('VERY_STABLE', 'STABLE', 'UNSTABLE');

-- CreateEnum
CREATE TYPE "SeatAvailability" AS ENUM ('AVAILABLE', 'CROWDED', 'FULL');

-- DropEnum
DROP TYPE "seatAvailability";

-- DropEnum
DROP TYPE "wifiSpeed";

-- DropEnum
DROP TYPE "wifiStability";
