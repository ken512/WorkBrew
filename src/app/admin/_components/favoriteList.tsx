"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { VirtuosoGrid } from "react-virtuoso";
import { Cafe } from "@/app/_types/Cafe";
import Link from "next/link";
import api from "@/_utils/api";
import "../../globals.css";

type Props = {
  cafes?: Cafe[];
};

export const FavoriteList: React.FC<Props> = ({ cafes = [] }) => {
  //複数のカフェIDを格納する配列
  const [favoriteCafeIds, setFavoriteCafeIds] = useState<Set<number>>(
    new Set()
  );
  const [gridWidth, setGridWidth] = useState<string>("");
  const [gridHeight, setGridHeight] = useState<string>("");

  // 初回取得後にお気に入りのcafeIdをSet化してstateに保存
  useEffect(() => {
    if (cafes.length > 0) {
      const initialIds = new Set<number>(cafes.map((cafe) => cafe.id));
      setFavoriteCafeIds(initialIds);
    }
  }, [cafes]);

  //複数のお気に入り状態にする
  const removeFavorite = (cafeId: number) => {
    setFavoriteCafeIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cafeId)) {
        newSet.delete(cafeId);
        // お気に入り削除APIを叩く
        api.delete("/api/admin/cafe_favorites", { cafeId });
      }
      return newSet;
    });
  };

  //初回+リサイズで更新
  useEffect(() => {
    const updateGridSize = () => {
      const width = window.innerWidth;

      if (width < 480) {
        // sm: スマホサイズ
        setGridWidth("300px");
        setGridHeight("1700px");
      } else if (width >= 480 && width < 699) {
        // md: タブレットサイズ
        setGridWidth("300px"); // ← タブレットに合わせたサイズに調整
        setGridHeight("1700px");
      } else {
        // PCサイズ
        setGridWidth("700px");
        setGridHeight("1700px");
      }
    };

    updateGridSize(); // 初回呼び出し
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  //お気に入り情報が一件もない場合に表示
  if (cafes.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-tan-300">
        <p className="text-lg font-semibold">お気に入り情報がありません</p>
      </div>
    );

  return (
    <div className="mb-[200px] font-bold sm:text-sm md:text-lg">
      <h1 className="text-[min(13vw,30px)] text-center mt-[100px] sm:text-xl">
        お気に入り一覧
      </h1>

      {/* `map関数の代わりにVirtuosoで繰り返し` */}
      <div className="mt-[100px] mx-auto bg-beige-200 rounded-xl p-10 md:p-8 sm:max-w-[350px] sm:h-[1800px] sm:px-10">
        {gridWidth && gridHeight && (
          <VirtuosoGrid
            style={{
              height: gridHeight,
              width: gridWidth,
            }}
            totalCount={cafes.length ?? 0}
            overscan={10}
            listClassName="grid grid-cols-2 sm:grid-cols-1 gap-10 px-4" /* リストの形式をグリットに指定 */
            itemContent={(index) => {
              const cafe = cafes[index];
              if (index >= cafes.length) return null;
              return (
                <div key={cafe.id} className="w-[300px] h-[400px]">
                  <Link href={`/cafe_post/${cafe.id}?from=favorites`}>
                    <div className="flex flex-col bg-white p-5 rounded-lg shadow-md w-[300px] h-[400px] sm:w-[250px] ">
                      {/* ユーザー情報 */}
                      <div className="flex justify-between w-full">
                        <div className="flex items-center">
                          <Image
                            src={cafe.users.profileIcon}
                            alt="Profile Image"
                            className="rounded-full aspect-square"
                            width={50}
                            height={50}
                          />
                          <p className="text-sm ml-2 truncate max-w-[150px]">
                            {cafe.users.userName}
                          </p>
                        </div>
                        {/* お気に入り表示 */}
                        <button
                          className="text-[20px] px-1"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeFavorite(cafe.id);
                          }}
                        >
                          {favoriteCafeIds.has(cafe.id) ? "❤️" : "🖤"}
                        </button>
                      </div>

                      {/*  サムネイル画像 */}
                      <div className="relative w-full h-[200px] mt-2">
                        <Image
                          src={cafe.thumbnailImage}
                          alt="Cafe Thumbnail"
                          className="rounded-lg object-cover"
                          layout="fill"
                        />
                      </div>

                      {/* カフェ情報 */}
                      <h3 className="text-sm py-2 text-center font-bold truncate w-full">
                        {cafe.cafeName}
                      </h3>

                      {/* WiFi・電源アイコン */}
                      <div className="py-1 flex space-x-2">
                        {cafe.wifiAvailable && (
                          <i className="bi bi-wifi text-lg"></i>
                        )}
                        {cafe.powerOutlets && (
                          <i className="bi bi-plug text-lg"></i>
                        )}
                      </div>

                      {/* エリア */}
                      <p className="text-xs text-gray-500">
                        エリア {cafe.area}
                      </p>
                      {/*  コメント */}
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
