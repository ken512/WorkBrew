"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/app/admin/_components/Button";
import { Modal } from "./Modal";
import { useImageHandler } from "@/app/admin/_hooks/useImageHandler";
import { Coordinate } from "../cafe_submission_form/types/coordinate";
import "../../globals.css";
import toast from "react-hot-toast";

export const ThumbnailHandle: React.FC<{
  onImageUpload: (imageUrl: string) => void;
  initialImage?: string;
  isSubmitting: boolean;
  isLoading: boolean;
  location: Coordinate | undefined;
  locationError: string | null;
  reset: () => void;
  getCurrentLocation: () => Promise<Coordinate>;
  setIsSubmitting: (isSubmitting: boolean) => void;
}> = ({ onImageUpload, initialImage, isLoading, locationError, getCurrentLocation, reset }) => {
  const {
    thumbnailImage,
    handleFileChange,
    handleAddClick,
    handleRemove,
    uploadJudgment,
    downloadJudgment,
    measureDownloadSpeed,
  } = useImageHandler(onImageUpload, initialImage, "thumbnail-input");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //画像がセットされたら、isSubmittingをfalseにする(ボタン表示処理)
  useEffect(() => {
    if (thumbnailImage) {
      setIsSubmitting(false); // 画像が表示されたら「追加中...」→「追加」に戻す
    }
  }, [thumbnailImage]); // thumbnailImage が変わったときに実行される

  // 画像追加ボタンクリック時
  const handleAddClickWithSubmitFlag = () => {
    if (isSubmitting) return; // 送信中であれば追加しない
    setIsSubmitting(true); // 送信中フラグを設定
    handleAddClick(); // 実際の画像追加処理
  };


  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirmGetLocation = async() => {
    try {
      await getCurrentLocation();
      closeModal();
      toast.success("現在地取得しました!!");
    } catch {
      console.error("現在地取得できませんでした!!");
    }
  }

  const handleClear = () => {
    reset();
    closeModal();
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-[600px] h-[350px] mt-[300px] sm:max-w-[350px]">
        {" "}
        {/* サムネイルのサイズ調整 */}
        {thumbnailImage ? (
          <Image
            src={thumbnailImage}
            alt="Thumbnail"
            className="rounded-lg object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            onError={(e) => {
              e.currentTarget.src = "/default-thumbnail.jpg"; // 画像エラー時もデフォルト画像にする
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg relative">
            {/* カメラアイコンの調整 */}
            <div className="absolute bottom-4 left-4 bg-white rounded-full p-2 shadow-md">
              <i className="bi bi-camera text-xl text-gray-600"></i>
            </div>
          </div>
        )}
      </div>
      <input
        id="thumbnail-input"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center space-y-4 sm:text-sm">
        {/*アップロード測定*/}
        {uploadJudgment !== null && (
          <p className="text-custom-blue font-bold text-lg sm:text-sm">
            アップロード速度: {uploadJudgment.toFixed(2)}Mbps
          </p>
        )}
        {/*ダウンロード測定*/}
        {downloadJudgment !== null && (
          <p className="text-custom-red font-bold text-lg sm:text-sm">
            ダウンロード速度:{downloadJudgment.toFixed(2)} Mbps
          </p>
        )}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
          onClick={measureDownloadSpeed}
        >
          ダウンロード速度測定
        </button>
      </div>
      <div className="flex ml-[400px] space-x-4 mt-3 sm:text-sm sm:ml-[0px] sm:pt-5">
        <div className="px-3">
          <Button
            type="button"
            variant="primary"
            onClick={handleAddClickWithSubmitFlag}
            disabled={isSubmitting}
          >
            {isSubmitting ? "追加中..." : "追加"}
          </Button>
        </div>
        <div className="px-3">
          <Button type="button" variant="danger" onClick={handleRemove}>
            削除
          </Button>
        </div>
        <div className="px-3">
          <Button type="button" variant="secondary" onClick={openModal} disabled={isLoading}>
            現在地取得
          </Button>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          title="現在地の取得を許可しますか？"
          showCloseButton
        >
          <p className="text-sm leading-relaxed text-gray-600">
            近くのカフェを表示するために現在地を使用します。
            <br />
            許可しなくても検索は可能です。(手入力)
          </p>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="
        inline-flex h-11 items-center justify-center rounded-xl px-4
        text-sm font-bold text-black
        ring-1 ring-inset ring-gray-400
        hover:bg-gray-200 active:bg-gray-100 transition
      "
            >
              キャンセル
            </button>

            <button
              type="button"
              onClick={handleConfirmGetLocation}
              className="
        inline-flex h-11 items-center justify-center rounded-xl px-4
        text-sm font-semibold text-white
        bg-gray-900 hover:bg-gray-600
        shadow-sm active:scale-[0.99] transition
      "
            >
              {isLoading ? "取得中..." : "取得する"}
            </button>
          </div>
        </Modal>
      </div>
      {locationError && <p className="text-lg font-bold text-red-500">{locationError}</p>}
    </div>
  );
};
