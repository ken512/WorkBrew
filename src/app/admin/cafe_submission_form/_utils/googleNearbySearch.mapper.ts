import { PlaceCandidate } from "../types/placeCandidate";
import { GoogleNearbySearchResponse } from "../types/googleNearbySearchResponse";
// 周辺情報を投稿フォーム形式で一覧表示するための関数

// フロント側で扱いやすい候補一覧に整形して、使えない候補を排除
export const mapGoogleNearbySearchToPlaceCandidate = (
  json: GoogleNearbySearchResponse,
): PlaceCandidate[] => {
  return (json.places ?? [])
    .map((place) => ({
      placeId: place.id,
      cafeName: place.displayName?.text ?? "",
      storeAddress: place.formattedAddress ?? "",
      locationCoordinates: {
        lat: place.location?.latitude ?? 0,
        lng: place.location?.longitude ?? 0,
      },
      primaryType: place.primaryType,
      types: place.types ?? [],
    }))
    .filter((c) => c.placeId && c.cafeName && c.storeAddress);
};
