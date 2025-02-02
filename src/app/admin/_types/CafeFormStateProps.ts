// カフェの状態管理用の型定義
export type CafeFormStateProps = {
  cafeName: string;
  thumbnailImage: string;
  area: string;
  storeAddress: string;
  openingTime: string;
  closingHours: string;
  closingDays: string;
  cafeUrl: string;
  menuOrdered: string;
  wifiAvailable: boolean;
  wifiSpeed: boolean;
  wifiStability: boolean;
  powerOutlets: boolean;
  seatAvailability: boolean;
  starRating: number | null;
  comment: string;
  locationCoordinates: string;
}