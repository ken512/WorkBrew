import { NearbySearchParams } from "../types/nearbySearchParams";
import { PlaceCandidate } from "../types/placeCandidate";
import api from "@/_utils/api";

type NearbySearchResult = { candidates: PlaceCandidate[] };

// クライアントから自アプリのAPI（/api/admin/cafe_submission_form/nearby-search）へPOSTして、
// サーバー側(route.ts)がGoogle Places Nearby Searchを代理実行した結果（PlaceCandidate[]）を受け取るための関数。
// ※Google APIキーをクライアントに露出させない目的

export const fetchNearbyCandidates = async (params: NearbySearchParams): Promise<PlaceCandidate[]> => {
  const res = await api.post<NearbySearchParams, NearbySearchResult>(
    "/api/admin/cafe_submission_form/nearby-search",
    params
  );
  return res.candidates;
};
