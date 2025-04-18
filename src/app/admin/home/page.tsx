"use client";
import React, { useState } from "react";
import { Cafe } from "@/app/_types/Cafe";
import { HeaderAdminBase } from "../_components/HeaderAdminBase";
import {
  LatestCafeList,
  RecommendationCafeList,
} from "../_components/CafeInfo";
import {
  LatestDetailDialog,
  RecommendationDetailDialog,
} from "../_components/CafeDetailInfo";
import useSWR from "swr";
import api from "@/_utils/api";
import { FooterDefault } from "@/app/_components/Footer/FooterDefault";
import "../../globals.css";

//共通リクエストを使用する
const fetcher = (url: string) => api.get(url);

const Home: React.FC = () => {
  const [selectedCafe, setSelectedCafe] = useState<Cafe  | null>(null);
  const [dialogType, setDialogType] = useState<
    "latest" | "recommendation" | null
  >(null); //最新情報かおすすめカフェの判別状態管理
  const [isOpen, setIsOpen] = useState(false);

  // SWR で API からデータを取得
  const { data, error, isLoading } = useSWR(
    ["/api/admin/home",fetcher],
    ([url]) => fetcher(url)
  );

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

  // 最新カフェ情報とおすすめカフェ情報を取得
  const latestCafes = data?.latestCafes || [];
  const recommendedCafes = data?.recommendedCafes || [];

  const openDialog = (cafes: Cafe, type: "latest" | "recommendation") => {
    setSelectedCafe(cafes); //  クリックされたカフェのみをセット
    setDialogType(type); // latest(最新情報) か recommendation(おすすめカフェ) を設定
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
    setSelectedCafe(null);
  };

  return (
    <div>
      <HeaderAdminBase href="/admin/home" />
      <div className="bg-tan-300 min-h-screen flex flex-col items-center justify-center">
        {/* エラーメッセージの表示 */}
        {error && <p className="text-red-500">データの取得に失敗しました</p>}
        <LatestCafeList
          cafes={latestCafes}
          onClick={(cafe) => openDialog(cafe, "latest")}
        />
        <RecommendationCafeList
          cafes={recommendedCafes}
          onClick={(cafe) => openDialog(cafe, "recommendation")}
        />
        {/* ダイアログの表示 */}
        {dialogType === "latest" && (
          <LatestDetailDialog
            cafe={selectedCafe}
            isOpen={isOpen}
            onClose={closeDialog}
          />
        )}
        {dialogType === "recommendation" && (
          <RecommendationDetailDialog
            cafe={selectedCafe}
            isOpen={isOpen}
            onClose={closeDialog}
          />
        )}
        < FooterDefault/>
      </div>
    </div>
  );
};

export default Home;
