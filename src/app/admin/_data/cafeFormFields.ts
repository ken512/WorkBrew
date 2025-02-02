type Field = {
  name: string;          // フィールドの名前
  label: string;         // フィールドのラベル
  placeholder: string;   // プレースホルダー
  required?: boolean;    // 必須かどうか（オプショナル）
};

export const CafeFormFields: Field[] = [
  { name: "cafeName", label: "店舗名", placeholder: "店舗名", required: true },
  { name: "area", label: "エリア", placeholder: "エリア" },
  { name: "storeAddress", label: "店舗住所", placeholder: "店舗住所", required: true },
  { name: "openingTime", label: "営業時間", placeholder: "営業時間" },
  { name: "closingDays", label: "休業日", placeholder: "休業日" },
  { name: "cafeUrl", label: "カフェのURL", placeholder: "カフェのURL" },
  { name: "menuOrdered", label: "頼んだメニュー", placeholder: "頼んだメニュー" },
];