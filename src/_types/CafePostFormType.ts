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
  wifiAvailable: boolean;
  setWifiAvailable: (wifiAvailable: boolean) => void;
  wifiSpeed: boolean;
  setWifiSpeed: (wifiSpeed: boolean) => void;
  wifiStability: boolean;
  setWifiStability: (wifiStability: boolean) => void;
  powerOutlets: boolean;
  setPowerOutlets: (powerOutlets: boolean) => void;
  seatAvailability: boolean;
  setSeatAvailability: (seatAvailability: boolean) => void;
  starRating: number;
  setStarRating:(starRating: number) => void;
  comment: string;
  setComment: (comment: string) => void;
  locationCoordinates: string;
  setLocationCoordinates: (locationCoordinates: string) => void;
}