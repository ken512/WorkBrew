"use client";
import React from "react";
import { HeaderAdminBase } from "../_components/headerAdminBase";
import { FavoriteList } from "../_components/favoriteList";
import useSWR from "swr";
import api from "@/_utils/api";
import { FooterDefault } from "@/app/_components/Footer/footerDefault";
import "../../globals.css";

//共通リクエストを使用する
const fetcher = (url: string) => api.get(url);
const CafeFavoriteList: React.FC = () => {
  // SWR で API からデータを取得
  const {
    data,
    error,
    isLoading,
  } = useSWR("/api/admin/cafe_favorites", fetcher);
  const cafes = data?.data?.favoriteCafes ?? [];
  console.log("取得データ:", cafes);

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
      <HeaderAdminBase href="#" />
      <div className="bg-tan-300 min-h-screen flex flex-col grid-flow-row items-center justify-center">
          < FavoriteList cafes={cafes} />
          <FooterDefault />
      </div>
    </div>
  );
};

export default CafeFavoriteList;
