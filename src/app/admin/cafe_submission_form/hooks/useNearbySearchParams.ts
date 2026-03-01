import { useState, useMemo } from "react";
import { Coordinate } from "../types/coordinate";
import { NearbySearchParams } from "../types/nearbySearchParams";

// Nearby Search (Places API) のリクエストボディ(params)を作るためのフック。
// UIで変更できる検索条件（radius など）を状態管理し、現在地(location)がある時だけ params を組み立てる。

//検索フォームの状態管理のフック(検索条件を作る・持つ)
export const useNearbySearchParams = (location: Coordinate | undefined) => {
  // 検索フォーム上でユーザーが自由に変更できる“検索条件”を、Reactの状態として持つため
  const [radius, setRadius] = useState(500);
  const [languageCode, setLanguageCode] = useState<string | undefined>("ja");
  const [rankPreference, setRankPreference] =
    useState<NearbySearchParams["rankPreference"]>("DISTANCE");
  const [maxResultCount, setMaxResultCount] = useState<number | undefined>(20);
  const [includedTypes, setIncludedTypes] = useState<string[] | undefined>(
    undefined,
  );
  
  const params = useMemo<NearbySearchParams | undefined>(() => {
    if (!location) return undefined;
    
    return {
      locationRestriction: { circle: { center: location, radius } },
      languageCode,
      rankPreference,
      maxResultCount,
      includedTypes,
    };
  }, [
    location,
    radius,
    languageCode,
    rankPreference,
    maxResultCount,
    includedTypes,
  ]);

  return {
    params,
    radius,
    languageCode,
    rankPreference,
    maxResultCount,
    includedTypes,
    setRadius,
    setLanguageCode,
    setRankPreference,
    setMaxResultCount,
    setIncludedTypes,
  };
};
