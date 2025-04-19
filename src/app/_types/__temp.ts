import { WifiSpeed, SeatAvailability } from "@prisma/client";
export type UpdateStatus = {
  seatAvailability: SeatAvailability | null;
  wifiSpeed: WifiSpeed | null;
}