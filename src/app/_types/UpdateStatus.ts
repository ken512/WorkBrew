import { WifiSpeed, SeatAvailability } from "@prisma/client";
export type UpdateStatus = {
  seatAvailability?: SeatAvailability | null;
  wifiSpeed?: WifiSpeed | null;
  area: string;
  openingTime?: string;
  closingHours?: string;
  businessHours?: string;
  closingDays: string;
  menuOrdered: string;
  cafeUrl: string;
}