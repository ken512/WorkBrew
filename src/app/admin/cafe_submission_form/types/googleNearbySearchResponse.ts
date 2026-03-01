// Google APIが返すデータ（生レスポンス）を、サーバ側で扱うための型
export type GoogleNearbySearchResponse = {
  places?: Array<{
    id?: number;
    displayName?: { text?: string };
    formattedAddress?: string;
    location?: { latitude?: number; longitude?: number };
    primaryType?: string;
    types?: string[];
  }>;
  error?: { message?: string };
};