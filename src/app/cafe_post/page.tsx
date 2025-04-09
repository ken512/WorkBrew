"use client";
import React, { useEffect, useState } from "react";
import { HeaderPublic } from "../_components/headerPublic";
import { CafeList } from "../_components/cafeList";
import { CafeFilter } from "../_components/cafeFilter";
import useSWR from "swr";
import api from "@/_utils/api";
import { useSearchParams } from "next/navigation";
import "../globals.css";

const fetcher = (url: string) => api.get(url);
const CafePost: React.FC = () => {
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
  const {
    data = { cafePostList: [] },
    error,
    isLoading,
  } = useSWR(`/api/public/cafe_post?${queryParams}`, fetcher);
  console.log("取得データ:", data.cafePostList);

  //フィルターを変更したときに実行
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">
          ☕️ コーヒーを淹れています... お待ちください
        </p>
      </div>
    );
  }

  if (error) return <div>データの取得に失敗しました</div>;
  return (
    <div>
      <HeaderPublic />
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
