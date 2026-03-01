import { WifiSpeed,  WifiStability, SeatAvailability } from "@prisma/client";
import { Coordinate } from "../cafe_submission_form/types/coordinate";

// カフェの状態管理用の型定義
export type CafeFormStateProps = {
  cafeName: string;
  thumbnailImage: string;
  area: string;
  storeAddress: string;
  businessHours: "",
  closingDays: string;
  cafeUrl: string;
  menuOrdered: string;
  wifiAvailable: boolean | null;
  wifiSpeed?: WifiSpeed | null;
  wifiStability?: WifiStability | null;
  powerOutlets: boolean | null;
  seatAvailability: SeatAvailability | null;
  starRating: number | null;
  comment: string;
  locationCoordinates: Coordinate | null;
}