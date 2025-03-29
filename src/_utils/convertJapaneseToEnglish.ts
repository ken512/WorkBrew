"use client";
//日本語の選択肢を送信前に英語（Enum値）へ正しく変換
export const convertJapaneseToEnglish = (key: string, value: string) => {
  if (key === "wifiSpeed") {
    const map: { [key: string]: string } = {
      高速: "HIGH",
      中速: "MEDIUM",
      低速: "LOW",
    };
    return map[value];
  }

  if (key === "seatAvailability") {
    const map: { [key: string]: string } = {
      空いている: "AVAILABLE",
      混雑中: "CROWDED",
      満席: "FULL",
    };
    return map[value];
  }

  return value;
};