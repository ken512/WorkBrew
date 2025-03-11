"use client";
import React, { useEffect, useState } from "react";
import { HeaderAdminBase } from "../admin/_components/headerAdminBase";
import { Cafe } from "../_types/Cafe";
import { CafeList } from "../_components/cafeList";
import { CafeFilter } from "../_components/cafeFilter";
import useSWR from "swr";
import "../globals.css";

const fetcher = (url: string) => fetch(url).then((response) => response.json());
const CafePost:React.FC = () => {
  const [filters, setFilters] = useState({
    area: "",
    wifiAvailable: null as boolean | null,
    powerOutlets: null as boolean | null,
    keyword: "",
  });
  const [filteredCafe, setFilteredCafe] = useState<Cafe[]>([]);

  // SWR で API からデータを取得
  const { data, error, isLoading} = useSWR("/api/public/cafe_post", fetcher);

  // データが取得できたら filteredCafe にセット（初期表示）
  useEffect(() => {
    if(data?.cafePostList) {
      setFilteredCafe(data.cafePostList);
    }
  }, [data]);

  //フィルター適用（取得済みのデータから絞り込み）
  useEffect(() => {
    if(!data?.cafePostList) return;
    
    const filteredCafe = data.cafePostList.filter((cafe: Cafe) => {
      return (
      (filters.area === "" || cafe.area.includes(filters.area)) &&
      (filters.wifiAvailable === null || cafe.wifiAvailable === filters.wifiAvailable) &&
      (filters.powerOutlets === null || cafe.powerOutlets === filters.powerOutlets) &&
      (filters.keyword === "" || cafe.cafeName.includes(filters.keyword))
      );
    });
    setFilteredCafe(filteredCafe);

  },[filters, data]);

  if(error) return <div>データの取得に失敗しました</div>
  // ローディング中
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">☕️ コーヒーを淹れています... お待ちください</p>
      </div>  
    );

  return (
    <div>
      <HeaderAdminBase href="/"/>
      <div className="bg-tan-300 min-h-screen flex flex-col grid-flow-row items-center justify-center">
      <CafeFilter filters={filters} onFilterChange={setFilters} cafeList={data.cafePostList}/>
      {/* フィルタリングされたカフェリストを表示 */}
      {filteredCafe.length > 0 ? (
          <CafeList cafes={filteredCafe} />
        ) : (
          <p className="text-lg font-semibold">☕️ 該当するカフェが見つかりませんでした。</p>
        )}
      </div>
    </div>
  )
}

export default CafePost;   