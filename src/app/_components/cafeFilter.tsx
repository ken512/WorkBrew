"use client";
import React, { useState } from "react";
import { Input } from "./Input";
import { Cafe } from "../_types/Cafe";

type Props = {
  filters: {
    area: string;
    wifiAvailable: boolean | null;
    powerOutlets: boolean | null;
    businessHours: string;
    keyword: string;
  };
  onFilterChange: (filters: Props["filters"]) => void;
  cafeList: Cafe[]; //取得済みのカフェデータを受け取る
};

export const CafeFilter: React.FC<Props> = ({
  filters,
  onFilterChange,
  cafeList,
}) => {
  const [searchText, setSearchText] = useState(filters.keyword);

  // 取得済みのカフェデータからエリア名とカフェ名一覧を取得
  const areaNames = Array.from(new Set(cafeList.map((cafe) => cafe.area)));
  const cafeNames = Array.from(new Set(cafeList.map((cafe) => cafe.cafeName)));

  // 入力された文字列を `filters` の適切なプロパティに分割
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchText(inputValue);
    const words = inputValue.split("  "); // スペースで分割

    let newFilters = { ...filters, area: "", keyword: "" };
    
    words.forEach((word) => {
      // エリアの部分一致検索
      const matchedArea = areaNames.filter((area) => area.includes(word));
      if (matchedArea.length > 0) {
        newFilters.area = word;
        return;//最初のマッチしたエリアだけが適用されるようにする 例: "東京"を含むカフェのみが表示されるようになる
      }

      // カフェ名の部分一致検索
      const matchingCafeName = cafeNames.filter((cafeName) =>
        cafeName.includes(word)
      );
      if (matchingCafeName.length > 0) {
        newFilters.keyword = word;
        return;
      }
    });
    
    //`onFilterChange()` でフィルタリングされたカフェリストを更新
    onFilterChange(newFilters);
  };

  //Wi-Fi・電源の有無の変更処理
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value === "" ? null : value === "true",
    });
  };

  return (
    <div className="bg-beige-200 p-4 rounded-lg shadow-md mb-4 w-full max-w-2xl mt-[50px]">
      <h3 className="text-lg font-bold mb-3">🔍 フィルター検索</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* エリア・カフェ名をまとめて検索 */}
        <Input
          type="search"
          id="search"
          name="search"
          placeholder="エリア・カフェ名を入力"
          className="border p-2 rounded-lg w-full"
          value={searchText}
          onChange={handleChange}
        />

        {/* Wi-Fi & 電源の有無 */}
        <div className="flex justify-between">
          <select
            name="wifiAvailable"
            className="border p-2 rounded-lg w-full"
            value={
              filters.wifiAvailable === null
                ? ""
                : String(filters.wifiAvailable)
            }
            onChange={handleSelectChange}
          >
            <option value="">Wi-Fiの有無</option>
            <option value="true">あり</option>
            <option value="false">なし</option>
          </select>

          <select
            name="powerOutlets"
            className="border p-2 rounded-lg w-full"
            value={
              filters.powerOutlets === null ? "" : String(filters.powerOutlets)
            }
            onChange={handleSelectChange}
          >
            <option value="">電源の有無</option>
            <option value="true">あり</option>
            <option value="false">なし</option>
          </select>
        </div>
      </div>
    </div>
  );
};
