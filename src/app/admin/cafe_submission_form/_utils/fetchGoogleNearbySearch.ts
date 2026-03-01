import { NearbySearchParams } from "../types/nearbySearchParams";
import { GoogleNearbySearchResponse } from "../types/googleNearbySearchResponse";


// fetch（外部呼び出し）
const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.primaryType",
  "places.types",
].join(",");

// Google Places Nearby Search (New) を呼び出して、生レスポンス(JSON)を返す（HTTPエラーは例外）
export const fetchNearbySearch = async (
  params: NearbySearchParams,
  apiKey: string,
) => {
  const res = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      body: JSON.stringify(params),
      cache: "no-cache",
    },
  );

  const json = (await res.json()) as GoogleNearbySearchResponse;

  if (!res.ok) {
    throw new Error(json.error?.message ?? "Places API error");
  }

  return json;
};
