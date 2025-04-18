"use client";
import React, { useEffect, useState } from "react";
import { CafeList } from "../_components/CafeList";
import { CafeFilter } from "../_components/CafeFilter";
import useSWR from "swr";
import api from "@/_utils/api";
import { useSearchParams } from "next/navigation";
import "../globals.css";

const fetcher = (url: string) => api.get(url);

const CafePostClient: React.FC = () => {
  const [filters, setFilters] = useState({
    area: "",
    keyword: "",
    wifiAvailable: "",
    powerOutlets: "",
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const newFilters = {
      area: searchParams.get("area") || "",
      keyword: searchParams.get("keyword") || "",
      wifiAvailable: searchParams.get("wifiAvailable") || "",
      powerOutlets: searchParams.get("powerOutlets") || "",
    };
    setFilters(newFilters);
  }, [searchParams]);

  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined)
  );

  const queryParams = new URLSearchParams(validFilters).toString();
  const { data = { cafePostList: [] }, error, isLoading } = useSWR(
    `/api/public/cafe_post?${queryParams}`,
    fetcher
  );

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return <p className="text-center">☕️ データ読み込み中です...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">データの取得に失敗しました</p>;
  }

  return (
    <>
      <CafeFilter filters={filters} onFilterChange={handleFilterChange} />
      {data?.cafePostList.length > 0 ? (
        <CafeList cafes={data.cafePostList} />
      ) : (
        <p className="text-lg font-semibold">☕️ 該当するカフェが見つかりませんでした。</p>
      )}
    </>
  );
};

export default CafePostClient;
