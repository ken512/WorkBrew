import { WifiSpeed,  WifiStability, SeatAvailability } from "@prisma/client";

export type Cafe = {
  id: string;
  cafeName: string;
  area: string;
  storeAddress: string;
  businessHours: string;
  thumbnailImage: string;
  closingDays: string;
  cafeUrl: string;
  menuOrdered: string;
  wifiAvailable: boolean;
  wifiSpeed: WifiSpeed;
  wifiStability: WifiStability;
  powerOutlets: boolean;
  seatAvailability: SeatAvailability;
  starRating: number | null;
  comment: string; 
  locationCoordinates: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}