"use client";
import React, { useEffect, useState } from "react";
import { Cafe } from "@/app/_types/Cafe";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { HeaderAdminBase } from "@/app/admin/_components/headerAdminBase";
import {
  LatestCafeList,
  RecommendationCafeList,
} from "../_components/cafeInfo";
import {
  LatestDetailDialog,
  RecommendationDetailDialog,
} from "../_components/cafeDetailInfo";
import "../../globals.css";

const Home: React.FC = () => {
  const [latestCafes, setLatestCafes] = useState<Cafe[]>([]);
  const [recommendedCafes, setRecommendedCafes] = useState<Cafe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [dialogType, setDialogType] = useState<
    "latest" | "recommendation" | null
  >(null); //最新情報かおすすめカフェの判別状態管理
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useSupabaseSession();

  const openDialog = (cafes: Cafe, type: "latest" | "recommendation") => {
    setSelectedCafe(cafes); //  クリックされたカフェのみをセット
    setDialogType(type); // latest(最新情報) か recommendation(おすすめカフェ) を設定
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
    setSelectedCafe(null);
  };

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      try {
        const res = await fetch("/api/admin/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        console.log(data);
        // 最新カフェデータを取得して `useState` に保存
        if (data.latestCafes) {
          setLatestCafes(data.latestCafes || []);
        }
        //おすすめカフェデータを取得して、`useState` に保存
        if (data.recommendedCafes) {
          setRecommendedCafes(data.recommendedCafes || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLatestCafes([]); // エラー時に空配列をセット
        setRecommendedCafes([]); // エラー時に空配列をセット
        setError("データの取得に失敗しました。");
      }
    };

    fetcher();
  }, [token]);

  return (
    <div>
      <HeaderAdminBase href="/admin/home" />
      <div className="bg-tan-300 min-h-screen flex flex-col items-center justify-center">
        <LatestCafeList
          cafes={latestCafes}
          onClick={(cafe) => openDialog(cafe, "latest")}
        />
        <RecommendationCafeList
          cafes={recommendedCafes}
          onClick={(cafe) => openDialog(cafe, "recommendation")}
        />
        {/*dialogType によって、最新情報を表示する*/}
        {dialogType === "latest" && (
          <LatestDetailDialog
            cafe={selectedCafe}
            isOpen={isOpen}
            onClose={closeDialog}
          />
        )}
        {/*dialogType によって、おすすめカフェを表示する*/}
        {dialogType === "recommendation" && (
          <RecommendationDetailDialog
            cafe={selectedCafe}
            isOpen={isOpen}
            onClose={closeDialog}
          />
        )}
        {error && <p>{error}</p>} {/* エラーメッセージを表示 */}
      </div>
    </div>
  );
};

export default Home;
