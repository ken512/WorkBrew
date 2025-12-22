import { Coordinate } from "./coordinate"
import {  Cafe } from "@prisma/client";

// 現在地とお店の位置情報
export type CafeLocationFormState = {
  location?: Coordinate;
  storeAddress?: Cafe["storeAddress"];
  cafeName?: Cafe["cafeName"];
  isLoading: boolean;
};