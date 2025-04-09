"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { VirtuosoGrid } from "react-virtuoso";
import { Cafe } from "../_types/Cafe";
import Link from "next/link";
import api from "@/_utils/api";
import { useLoginSafeFetcher } from "../_hooks/useFetch";
import { useResize } from "../_hooks/useResize";
import "../globals.css";

type Props = {
  cafes?: Cafe[];
};

export const CafeList: React.FC<Props> = ({ cafes = [] }) => {
  const [favoriteCafeIds, setFavoriteCafeIds] = useState<Set<number>>(
    new Set()
  );
  const { gridWidth, gridHeight } = useResize();

  // ログインユーザーのお気に入り一覧を取得
  const { data: favoriteData } = useLoginSafeFetcher(
    "/api/admin/cafe_favorites"
  );

  // 初回取得後にお気に入りのcafeIdをSet化してstateに保存
  useEffect(() => {
    if (favoriteData?.data?.favorites) {
      const ids = new Set<number>(
        favoriteData.data.favorites.map(
          (fav: { cafeId: number }) => fav.cafeId
        )
      );
      setFavoriteCafeIds(ids);
    }
  }, [favoriteData]);

  console.log("favoriteData", favoriteData);

  const isFavorited = (cafeId: number) => favoriteCafeIds.has(cafeId);

  //「お気に入りの「追加 or 削除」を切り替える関数
  const toggleFavorite = (cafeId: number) => {
    setFavoriteCafeIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cafeId)) {
        newSet.delete(cafeId);
        // お気に入り削除APIを叩く
        api.delete("/api/admin/cafe_favorites", { cafeId });
      } else {
        newSet.add(cafeId);
        // お気に入り追加APIを叩く
        api.post("/api/admin/cafe_favorites", { cafeId });
      }
      return newSet;
    });
  };

  return (
    <div className="mb-[200px] font-bold sm:text-sm md:text-lg">
      <h1 className="text-[min(13vw,30px)] text-center mt-[100px] sm:text-xl">
        投稿一覧
      </h1>

      <div className="mt-[100px] mx-auto bg-beige-200 rounded-xl p-10 md:p-8 sm:max-w-[350px] sm:h-[1800px] sm:px-10">
        {gridWidth && gridHeight && (
          <VirtuosoGrid
            style={{ height: gridHeight, width: gridWidth }}
            totalCount={cafes.length ?? 0}
            overscan={10}
            listClassName="grid grid-cols-2 sm:grid-cols-1 gap-10 px-4"
            itemContent={(index) => {
              const cafe = cafes[index];
              if (!cafe) return null;

              return (
                <div key={cafe.id} className="w-[300px] h-[400px]">
                  <Link href={`/cafe_post/${cafe.id}`}>
                    <div className="flex flex-col bg-white p-5 rounded-lg shadow-md w-[300px] h-[400px] sm:w-[250px]">
                      {/* ユーザー情報 */}
                      <div className="flex justify-between w-full">
                        <div className="flex items-center">
                          <Image
                            src={cafe?.users?.profileIcon}
                            alt="Profile Image"
                            className="rounded-full aspect-square"
                            width={50}
                            height={50}
                          />
                          <p className="text-sm ml-2 truncate max-w-[150px]">
                            {cafe.users.userName}
                          </p>
                        </div>

                        {/* お気に入りボタン */}
                        <button
                          className="text-[20px] px-1"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(cafe.id);
                          }}
                        >
                          {isFavorited(cafe.id) ? "❤️" : "🖤"}
                        </button>
                      </div>

                      {/* サムネイル */}
                      <div className="relative w-full h-[200px] mt-2">
                        <Image
                          src={cafe.thumbnailImage}
                          alt="Cafe Thumbnail"
                          className="rounded-lg object-cover"
                          layout="fill"
                        />
                      </div>

                      <h3 className="text-sm py-2 text-center font-bold truncate w-full">
                        {cafe.cafeName}
                      </h3>

                      <div className="py-1 flex space-x-2">
                        {cafe.wifiAvailable && (
                          <i className="bi bi-wifi text-lg"></i>
                        )}
                        {cafe.powerOutlets && (
                          <i className="bi bi-plug text-lg"></i>
                        )}
                      </div>

                      <p className="text-xs text-gray-500">
                        エリア {cafe.area}
                      </p>
                      <p className="text-xs py-2 line-clamp-3 overflow-hidden text-gray-700 w-full">
                        {cafe.comment}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            }}
          />
        )}
      </div>
    </div>
  );
};
