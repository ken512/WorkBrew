import { NextResponse } from "next/server";
import { NearbySearchParams } from "@/app/admin/cafe_submission_form/types/nearbySearchParams";
import { mapGoogleNearbySearchToPlaceCandidate } from "@/app/admin/cafe_submission_form/_utils/googleNearbySearch.mapper";
import { fetchNearbySearch } from "@/app/admin/cafe_submission_form/_utils/fetchGoogleNearbySearch";

// Google APIキーをクライアントに露出させないため、Places API 呼び出しはサーバー側(route.ts)で代理実行する

// POSTメソッドでリクエスト処理とレスポンス
// Nearby Searchは、POSTのみサポートしている

export const POST = async (request: Request) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "APIキーがありません" },
      { status: 500 },
    );
  }

  const params = (await request.json()) as NearbySearchParams;

  try {
    const json = await fetchNearbySearch(params, apiKey);

    const candidates = mapGoogleNearbySearchToPlaceCandidate(json);

    return NextResponse.json({ candidates });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "検索に失敗しました";
    return NextResponse.json({ message }, { status: 400 });
  }
};
