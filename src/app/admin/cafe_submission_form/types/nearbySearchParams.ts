import { Coordinate } from "./coordinate";

// 要件: 現在地の周辺候補をだす。
// Places API Nearby Search (New) の リクエストボディ（JSON）で渡すパラメータ構造の型定義

export type NearbySearchParams = {
  locationRestriction: {
    circle: { 
      center: Coordinate; // 中心(現在地)
      radius: number; // 半径(メートル)
    }; // 中心 + 半径
  }; // 検索範囲
  languageCode?: string; // 名称や住所表記の言語指定
  rankPreference?: "DISTANCE" | "POPULARITY"; // 現在地周辺の候補の条件 距離優先指定 DISTANCE:距離優先 POPULARITY: 人気優先
  maxResultCount?: number; // 候補一覧の件数
  includedTypes?: string[]; // 含めたいカテゴリだけを絞る
  excludedTypes?: string[]; // 除外したいカテゴリを外す
}