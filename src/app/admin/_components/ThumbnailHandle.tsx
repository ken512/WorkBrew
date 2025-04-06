"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/app/admin/_components/Button";
import { useImageHandler } from "@/app/admin/_hooks/useImageHandler";

export const ThumbnailHandle: React.FC<{
  onImageUpload: (imageUrl: string) => void;
  initialImage?: string;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}> = ({ onImageUpload, initialImage }) => {
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
      </div>
    </div>
  );
};
