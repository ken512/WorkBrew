"use client";

export const getMonthDifference = (olderInput: Date, newerInput: Date):number => {
   // 日付オブジェクトに変換
  const older = new Date(olderInput);
  const newer = new Date(newerInput);
   // 年の差分を計算（例: 2024年 - 2022年 = 2年）
  const yearsDiff = newer.getFullYear() - older.getFullYear();
   // 月の差を算出（年差分を月に換算して足す）
  let monthsDiff = newer.getMonth() - older.getMonth() + yearsDiff * 12;
  // 日付がまだ来てない場合は、1ヶ月未満なのでマイナス1して調整
  // 例: 1月31日 → 2月1日 などは、実質は1ヶ月たっていない
  if(newer.getDate() < older.getDate()) {
    monthsDiff -= 1;
  }
  return monthsDiff;
}