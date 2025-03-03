 //星評価を⭐️で表示させる関数処理
  export const RenderStars = (rating: number | null) => {
  return Array.from({ length: rating ?? 0 })
    .map(() => "⭐️")
    .join(""); //ratingの長さに応じた配列を生成。mapで各要素に⭐️を割り当て、joinでratingを文字列として連結
};
