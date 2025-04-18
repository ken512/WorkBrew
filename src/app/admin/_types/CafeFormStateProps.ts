import { WifiSpeed,  WifiStability, SeatAvailability } from "@prisma/client";

// カフェの状態管理用の型定義
export type CafeFormStateProps = {
  cafeName: string;
  thumbnailImage: string;
  area: string;
  storeAddress: string;
  businessHours: string,
  closingDays: string;
  cafeUrl: string;
  menuOrdered: string;
  wifiAvailable?: boolean;
  wifiSpeed?: WifiSpeed | null;
  wifiStability?: WifiStability | null;
  powerOutlets: boolean;
  seatAvailability: SeatAvailability | null;
  starRating: number;
  comment: string;
  locationCoordinates: string;
}