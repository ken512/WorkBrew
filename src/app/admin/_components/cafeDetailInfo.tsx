"use client";
import React from "react";
import { Cafe } from "@/app/_types/Cafe";
import { RenderStars } from "../_utils/renderStars";
import { timeAgo } from "../_utils/timeAgo";
import Image from "next/image";
import {
  convertSeatAvailability,
  convertWifiSpeed,
} from "../_utils/convertLabels";
import ReactModal from "react-modal";

type Props = {
  cafe: Cafe | null; // クリックされたカフェ1件を受け取る
  isOpen: boolean;
  onClose: () => void;
};

export const LatestDetailDialog: React.FC<Props> = ({
  cafe,
  isOpen,
  onClose,
}) => {
  if (!cafe) return null; // 選択されていない場合は何も表示しない

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 z-[60]"
    >
      <div className="bg-beige-200 rounded-lg shadow-lg">
        {/* 画像 */}
        <div className="relative w-[500px] h-[250px] sm:max-w-[390px]">
          <Image
            src={cafe.thumbnailImage}
            alt="thumbnailImage"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        {/* 店舗情報 */}
        <div className="font-bold p-5 flex flex-col justify-between h-full">
          <h3 className="py-3 overflow-auto max-w-md whitespace-pre-wrap break-words">
            {cafe.cafeName}
          </h3>
          <p className="py-3">{timeAgo(cafe.createdAt && cafe.updatedAt)}</p>
          <p className="py-3">エリア {cafe.area}</p>
          {/* 現在の空き状況 (ボタン形式) */}
          <p className="mt-2 font-bold">現在の空き状況</p>
          <div className="flex space-x-2 mt-1">
            <span
              className={`px-3 py-1 rounded-lg text-black ${
                cafe.seatAvailability === "AVAILABLE"
                  ? "bg-custom-green"
                  : cafe.seatAvailability === "CROWDED"
                  ? "bg-custom-orange"
                  : "bg-custom-red"
              }`}
            >
              {convertSeatAvailability(cafe.seatAvailability)}
            </span>
          </div>
          {/* Wi-Fiの速度 */}
          <p className="mt-5 font-bold">
            <i>Wi-Fi</i>の速度
          </p>
          <div className="flex space-x-2 mt-1">
            <span
              className={`px-3 py-1 rounded-lg text-black ${
                cafe.wifiSpeed === "HIGH"
                  ? "bg-custom-green"
                  : cafe.wifiSpeed === "MEDIUM"
                  ? "bg-custom-orange"
                  : "bg-custom-red"
              }`}
            >
              {convertWifiSpeed(cafe.wifiSpeed)}
            </span>
          </div>
          <div className="text-center">
            <button
              className="mt-4 p-2 bg-red-500 text-white rounded"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export const RecommendationDetailDialog: React.FC<Props> = ({
  cafe,
  isOpen,
  onClose,
}) => {
  if (!cafe) return null; // 選択されていない場合は何も表示しない

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Modal"
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 z-[60]"
      >
        <div className="bg-beige-200 rounded-lg w-full max-w-sm sm:max-w-md max-h-screen overflow-auto">
          {/* 画像 */}
          <div className="relative w-full h-[200px] sm:h-full ">
            <Image
              src={cafe.thumbnailImage}
              alt="thumbnailImage"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* 店舗情報 */}
          <div className="font-bold flex flex-col justify-between h-full">
            <h3 className="py-5 overflow-auto whitespace-pre-wrap break-words">
              {cafe.cafeName}
            </h3>
            <p className="py-2">星評価 {RenderStars(cafe.starRating)}</p>
            <p className="py-2">エリア {cafe.area}</p>
            <p className="font-bold mt-4 mb-5">おすすめ理由</p>
            <div className="w-full max-w-full max-h-[300px] overflow-auto whitespace-pre-wrap break-words">
              {cafe.comment}
            </div>
            <div className="text-center mb-5">
              <button
                className="mt-4 p-2 bg-red-500 text-white rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};
