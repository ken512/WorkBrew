"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "./Input";

type Filters = {
  area: string;
  keyword: string;
  wifiAvailable: string;
  powerOutlets: string;
};

type Props = {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
};

export const CafeFilter: React.FC<Props> = ({ onFilterChange, filters }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchText, setSearchText] = useState(filters.keyword || "");

  // クエリパラメータを取得(初期フィルター null を "" に置換)
  const [filter, setFilter] = useState<Filters>({
    area: searchParams.get("area") || "",
    keyword: searchParams.get("keyword") || "",
    wifiAvailable: searchParams.get("wifiAvailable") || "",
    powerOutlets: searchParams.get("powerOutlets") || "",
  });

  // クエリパラメータの更新（検索ボタンで実行）
  const updateQueryParams = (updatedFilters: typeof filters) => {
    const queryParams = new URLSearchParams(updatedFilters).toString();
    router.replace(`?${queryParams}`); // URLを更新（ページのスクロールは維持）
  };

  // 入力変更時（URLは更新しない）
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newFilters = { ...filter, [name]: value };
    setSearchText(newFilters.keyword || ""); // 入力欄に反映
    setFilter(newFilters); // 状態だけ更新。URL変更なし！
  };
  return (
    <div className="bg-beige-200 p-4 rounded-lg shadow-md mb-4 w-full max-w-2xl mt-[50px] sm:w-[350px]">
      <h3 className="text-lg font-bold mb-3 sm:text-sm">🔍 フィルター検索</h3>

      {/* エリア・カフェ名をまとめて検索 */}
      <div className="sm:flex sm:flex-col grid grid-cols-2 gap-5 md:flex-row md:items-center md:space-x-2 space-y-2 md:space-y-0 w-full">
        <Input
          type="search"
          id="keyword"
          name="keyword"
          placeholder="エリア・カフェ名"
          className="border p-2 rounded-lg w-full sm:text-sm"
          value={searchText}
          onChange={handleFilterChange}
        />
        {/* Wi-Fi & 電源の有無 */}
        <div className="flex justify-between">
        <select
          name="wifiAvailable"
          className="border p-2 rounded-lg w-full"
          value={
            filter.wifiAvailable === null ? "" : String(filter.wifiAvailable)
          }
          onChange={handleFilterChange}
        >
          <option value="">Wi-Fiの有無</option>
          <option value="true">あり</option>
          <option value="false">なし</option>
        </select>

        <select
          name="powerOutlets"
          className="border p-2 rounded-lg w-full"
          value={
            filter.powerOutlets === null ? "" : String(filter.powerOutlets)
          }
          onChange={handleFilterChange}
        >
          <option value="">電源の有無</option>
          <option value="true">あり</option>
          <option value="false">なし</option>
        </select>
        </div>
        <button className="border p-2 rounded-lg w-[640px] sm:w-full bg-white"
          onClick={() => {
            updateQueryParams(filter)
            onFilterChange(filter)
          }}>
        🔍   検索
        </button>
      </div>
    </div>
  );
};
