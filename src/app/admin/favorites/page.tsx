"use client";
import React, {useState, useEffect} from "react";
import { HeaderAdminBase } from "../_components/HeaderAdminBase";
import { FavoriteList } from "../_components/FavoriteList";
import useSWR from "swr";
import api from "@/_utils/api";
import { FooterDefault } from "@/app/_components/Footer/FooterDefault";
import "../../globals.css";

const CafeFavoriteList: React.FC = () => {
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    setShouldFetch(true); // クライアント限定で fetch を許可
  }, []);

  const { data, error, isLoading } = useSWR(
    shouldFetch ? "/api/admin/cafe_favorites" : null,
    (url) => api.get(url)
  );

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
