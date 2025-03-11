"use client";
import { getMonthDifference } from "./monthDifference";

//カフェ投稿を時間経過として表示させる関数
export const TimeAgo = (dateInput: Date) => {
  const date = new Date(dateInput);
  const now = new Date(); // 現在の時間
  const diffInSeconds =  Math.floor((now.getTime() - date.getTime()) / 1000); // 経過時間を秒で計算

  // 固定の秒・分・時・日は単純な換算
  const seconds = diffInSeconds;
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  // 月・年は実際の日付差から計算
  const months = getMonthDifference(date, now);

  // 年の計算：現在の月日がまだ対象日付に到達していなければ1年分減らす
  const years =
    now.getFullYear() -
    date.getFullYear() -
    (now.getMonth() < date.getMonth() ||
    (now.getMonth() === date.getMonth() && now.getDate() < date.getDate())
      ? 1
      : 0);

  // 各単位の値と閾値、表示ラベルをまとめた配列
  const units = [
    { value: seconds, threshold: 60, label: "秒前" }, // 60秒未満は秒で表示
    {
      value: minutes,
      threshold: 60,
      label: "分前",
    }, // 1時間未満は分で表示
    {
      value: hours,
      threshold: 24,
      label: "時間前",
    }, // 1日未満は時間で表示
    { value: days, threshold: 30, label: "日前" }, // 1ヶ月未満は日で表示
    {
      value: months,
      threshold: 12,
      label: "ヶ月前",
    }, // 1年未満は月で表示
    { value: years, threshold: Infinity, label: "年前" }, // それ以上は年で表示
  ];

  // ループで条件に合致する単位を探す
  for (const unit of units) {
    if (unit.value < unit.threshold) {
      return `${unit.value}${unit.label}`;
    }
  }

};
