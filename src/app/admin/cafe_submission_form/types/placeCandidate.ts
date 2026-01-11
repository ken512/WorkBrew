import { Cafe } from "@prisma/client";
import { Coordinate } from "./coordinate";
// 現在地とお店の位置情報のレスポンス型
export type PlaceCandidate = {
  placeId?: Cafe["placeId"];
  cafeName: Cafe["cafeName"];
  storeAddress: Cafe["storeAddress"];
  locationCoordinates: Coordinate;
  primaryType?: Cafe["primaryType"];
  types: Cafe["types"];
};
