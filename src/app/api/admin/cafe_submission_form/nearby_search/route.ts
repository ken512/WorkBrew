import { NextResponse } from "next/server";
import { NearbySearchParams } from "@/app/admin/cafe_submission_form/types/nearbySearchParams";
import { PlaceCandidate } from "@/app/admin/cafe_submission_form/types/placeCandidate";

// APIキーが漏れるの防ぐため、APIを叩く処理をサーバーサイド側で処理
// GoogleNearbySearchResponse でGoogleからのレスポンス処理

type GoogleNearbySearchResponse = {
  places?: Array<{
    id?: number;
    displayName?: { text?: string };
    formattedAddress?: string;
    location?: { latitude?: number; longitude?: number };
    primaryType?: string;
    types?: string[];
  }>;
  error?: { message: string };
};

// POSTメソッドでリクエスト処理とレスポンス
// Nearby Searchは、POSTのみサポートしている
export const POST = async (request: Request) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "APIキーがありません" },
      { status: 500 },
    );
  }

// フロントから受け取ったリクエストボディに NearbySearchParams の型を付けて扱う
// TODO バリデーションは 運用時の安全で、Zod などを使うと一気に楽かも
  const params = (await request.json()) as NearbySearchParams;

// NearbySearchParamsでは、1つ以上のデータ型を指定するフィールドマスクが必須
// レスポンスで返すフィールドのリストを指定
  const res = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": [
          "places.id",
          "places.displayName",
          "places.formattedAddress",
          "places.location",
          "places.primaryType",
          "places.types",
        ].join(","),
      },
      body: JSON.stringify(params),
      cache: "no-store",
    },
  );

  const json = (await res.json()) as GoogleNearbySearchResponse;

  if (!res.ok) {
    return NextResponse.json(
      { message: json.error?.message ?? "Places API error" },
      { status: res.status },
    );
  }

  // フロント側で扱いやすい候補一覧に整形して、使えない候補を排除
  const candidates: PlaceCandidate[] = (json.places ?? []).map((place) => ({
    placeId: place.id,
    cafeName: place.displayName?.text ?? "",
    storeAddress: place.formattedAddress ?? "",
    locationCoordinates: {
      lat: place.location?.latitude ?? 0,
      lng: place.location?.longitude ?? 0,
    },
    primaryType: place.primaryType,
    types: place.types ?? [],
  })).filter((c) => c.placeId && c.cafeName && c.storeAddress);

  return NextResponse.json({candidates})
};
