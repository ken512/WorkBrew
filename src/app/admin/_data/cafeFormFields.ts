type Field = {
  name: string;          // フィールドの名前
  label: string;         // フィールドのラベル
  placeholder: string;   // プレースホルダー
  required?: boolean;    // 必須かどうか（オプショナル）
};

export const CafeFormFields: Field[] = [
  { name: "cafeName", label: "店舗名", placeholder: "渋谷カフェ", required: true },
  { name: "area", label: "エリア", placeholder: "東京・表参道" },
  { name: "storeAddress", label: "店舗住所", placeholder: "東京都渋谷区渋谷xxxxxx", required: true },
  { name: "businessHours", label: "営業時間", placeholder: "7:00 - 22:00", required: true },//openingTimeとclosingHoursをまとめる
  { name: "closingDays", label: "休業日", placeholder: "火曜日" },
  { name: "cafeUrl", label: "カフェのURL", placeholder: "example.com" },
  { name: "menuOrdered", label: "頼んだメニュー", placeholder: "カフェラテ" },
];