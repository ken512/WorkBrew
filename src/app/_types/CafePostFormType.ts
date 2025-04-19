import { WifiSpeed,  WifiStability, SeatAvailability } from "@prisma/client";

export type CafePostFormProps = {
  cafeName: string;
  setCafeName:(cafeName: string) => void;
  area: string;
  setArea: (area: string) => void;
  storeAddress: string;
  setStoreAddress: (storeAddress: string) => void;
  openingTime: string;
  setOpeningTime: (openingTime: string) => void;
  closingHours: string;
  setClosingHours: (closingHours: string) => void;
  thumbnailImage: string;
  setThumbnailImage: (thumbnailImage: string) => void;
  closingDays: string;
  setClosingDays: (closingDays: string) => void;
  cafeUrl: string;
  setCafeUrl: (cafeUrl: string) => void;
  menuOrdered: string;
  setMenuOrdered: (menuOrdered: string) => void;
  wifiAvailable?: boolean;
  setWifiAvailable?: (wifiAvailable: boolean) => void;
  wifiSpeed?: WifiSpeed;
  setWifiSpeed?: (wifiSpeed: WifiSpeed) => void;
  wifiStability?: WifiStability;
  setWifiStability?: (wifiStability: WifiStability) => void;
  powerOutlets: boolean;
  setPowerOutlets: (powerOutlets: boolean) => void;
  seatAvailability: SeatAvailability;
  setSeatAvailability: (seatAvailability: SeatAvailability) => void;
  starRating: number;
  setStarRating:(starRating: number) => void;
  comment: string;
  setComment: (comment: string) => void;
  locationCoordinates: string;
  setLocationCoordinates: (locationCoordinates: string) => void;
}