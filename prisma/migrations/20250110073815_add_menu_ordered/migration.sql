-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userName" TEXT NOT NULL,
    "profileIcon" TEXT NOT NULL,
    "biography" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "contactContent" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Information" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "is_suggested" BOOLEAN NOT NULL,
    "latestInfo" TEXT NOT NULL,
    "timeElapsed" VARCHAR(50) NOT NULL,
    "recommended_cafe" TEXT NOT NULL,
    "recommendation_reason" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "cafeId" INTEGER NOT NULL,

    CONSTRAINT "Information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cafe" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cafeName" VARCHAR(100) NOT NULL,
    "thumbnailImage" VARCHAR(255) NOT NULL,
    "area" TEXT NOT NULL,
    "storeAddress" TEXT NOT NULL,
    "openingTime" VARCHAR(5) NOT NULL,
    "closingHours" VARCHAR(5) NOT NULL,
    "closingDays" TEXT NOT NULL,
    "cafeUrl" VARCHAR(255) NOT NULL,
    "menuOrdered" TEXT NOT NULL,
    "wifiAvailable" BOOLEAN NOT NULL,
    "wifiSpeed" BOOLEAN NOT NULL,
    "wifiStability" BOOLEAN NOT NULL,
    "powerOutlets" BOOLEAN NOT NULL,
    "seatAvailability" BOOLEAN NOT NULL,
    "starRating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "locationCoordinates" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Cafe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "cafeId" INTEGER NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_key" ON "Contact"("userId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cafe" ADD CONSTRAINT "Cafe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
