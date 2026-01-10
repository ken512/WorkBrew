import { Cafe } from "@prisma/client";
import { Coordinate } from "./coordinate";
import { CafeFormStateProps } from "../../_types/CafeFormStateProps";

//現在地とお店の位置情報のレスポンスの結果をフォーム(投稿データ)に変換するためのフォームの型
export type CafeLocationFormState = Pick<
  CafeFormStateProps,
  "cafeName" | "storeAddress"
> & { placeId?: Cafe["placeId"]; locationCoordinates: Coordinate };
