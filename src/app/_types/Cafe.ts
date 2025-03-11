import { WifiSpeed,  WifiStability, SeatAvailability } from "@prisma/client";

export type Cafe = {
  id: number;
  cafeName: string;
  area: string;
  storeAddress: string;
  openingTime?: string;
  closingHours?: string;
  businessHours?: string;
  thumbnailImage: string;
  closingDays: string;
  cafeUrl: string;
  menuOrdered: string;
  wifiAvailable: boolean | null;
  wifiSpeed: WifiSpeed;
  wifiStability: WifiStability;
  powerOutlets: boolean | null;
  seatAvailability: SeatAvailability;
  starRating: number | null;
  comment: string; 
  locationCoordinates: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  favorites: {
    id: number;
    userId: number;
  }
  users: {
    id: number;
    userName: string;
    profileIcon: string;
  }
}