"use client";
import React, { useEffect, useState } from "react";
import { HeaderAdminBase } from "../admin/_components/headerAdminBase";
import { CafeList } from "../_components/cafeList";
import { CafeFilter } from "../_components/cafeFilter";
import useSWR from "swr";
import { Cafe } from "../_types/Cafe";
import { useSearchParams } from "next/navigation";
import "../globals.css";

const fetcher = (url: string) => fetch(url).then((response) => response.json());
const CafePost: React.FC<Cafe[]> = () => {
  
  const [filters, setFilters] = useState({
    area: "",
    keyword: "",
    wifiAvailable: "",
    powerOutlets: "",
  });

  const searchParams = useSearchParams();
  console.log("検索パラメータ", searchParams.toString());

  //検索条件を取得し、それをコンポーネントのfilters状態に反映
  useEffect(() => {
    const cafeFilters = {
      area: searchParams.get("area") || "",
      keyword: searchParams.get("keyword") || "",
      wifiAvailable: searchParams.get("wifiAvailable") || "",
      powerOutlets: searchParams.get("powerOutlets") || "",
    };
    setFilters(cafeFilters);
  }, [searchParams]);

  //undefined削除して、クエリパラメータとして適用できるように新しいオブジェクト生成
  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(([value]) => value !== undefined)
  );

  // クエリパラメータを組み立ててAPIエンドポイントに適用
  const queryParams = new URLSearchParams(validFilters).toString();

  console.log("APIに送るクエリパラメータ:", queryParams);

  // SWR で API からデータを取得
  const { data = { cafePostList: [] }, error } = useSWR(
    `/api/public/cafe_post?${queryParams}`,
    fetcher
  );
  console.log("取得データ:", data.cafePostList);

  //フィルターを変更したときに実行
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (error) return <div>データの取得に失敗しました</div>;
  return (
    <div>
      <HeaderAdminBase href="/" />
      <div className="bg-tan-300 min-h-screen flex flex-col grid-flow-row items-center justify-center">
        <CafeFilter filters={filters} onFilterChange={handleFilterChange} />
        {/* フィルタリングされたカフェリストを表示 */}
        {data?.cafePostList.length > 0 ? (
          <CafeList cafes={data?.cafePostList} />
        ) : (
          <p className="text-lg font-semibold">
            ☕️ 該当するカフェが見つかりませんでした。
          </p>
        )}
      </div>
    </div>
  );
};

export default CafePost;
