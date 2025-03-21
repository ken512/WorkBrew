"use client";
import React, { useState } from "react";
import { useSearchParams,useRouter  } from "next/navigation";
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

export const CafeFilter: React.FC<Props> = ({
  onFilterChange,
  filters,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchText, setSearchText] = useState(filters.keyword || "");

   // クエリパラメータを取得
  const [filter, setFilter] = useState({
    area: searchParams.get("area"),
    keyword: searchParams.get("keyword"),
    wifiAvailable: searchParams.get("wifiAvailable"),
    powerOutlets: searchParams.get("powerOutlets"),
  });
  
  //クエリパラメータの更新
  const updateQueryParams = (updatedFilters: typeof filters) => {
    const queryParams = new URLSearchParams(updatedFilters).toString();
    router.replace(`?${queryParams}`);// URLを更新（ページのスクロールは維持）
  }

  //フィルター変更時の処理
  const handleFilterChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    const inputValue = e.target.value;
    setSearchText(inputValue);
    const newFilters = {...filters, [name]: value};
    setFilter(newFilters);
    updateQueryParams(newFilters);
    onFilterChange(newFilters);
  }

  return (
    <div className="bg-beige-200 p-4 rounded-lg shadow-md mb-4 w-full max-w-2xl mt-[50px]">
      <h3 className="text-lg font-bold mb-3">🔍 フィルター検索</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* エリア・カフェ名をまとめて検索 */}
        <Input
          type="search"
          id="keyword"
          name="keyword"
          placeholder="エリア・カフェ名を入力"
          className="border p-2 rounded-lg w-full"
          value={searchText}
          onChange={handleFilterChange}
        />

        {/* Wi-Fi & 電源の有無 */}
        <div className="flex justify-between">
          <select
            name="wifiAvailable"
            className="border p-2 rounded-lg w-full"
            value={
              filter.wifiAvailable === null
                ? ""
                : String(filter.wifiAvailable)
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
      </div>
    </div>
  );
}
