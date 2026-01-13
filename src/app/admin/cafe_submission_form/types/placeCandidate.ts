import { Coordinate } from "./coordinate";
// 現在地とお店の位置情報のレスポンス型
export type PlaceCandidate = {
  placeId?: string;
  cafeName: string;
  storeAddress: string;
  locationCoordinates: Coordinate;
  primaryType?: string;
  types: string[];
};
