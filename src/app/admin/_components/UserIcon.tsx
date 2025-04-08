"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/app/admin/_components/Button";
import "../../globals.css";
import { useImageHandler } from "@/app/admin/_hooks/useImageHandler";

export const UserIcon: React.FC<{
  onImageUpload: (imageUrl: string) => void;
  initialImage?: string;
}> = ({ onImageUpload, initialImage }) => {
  const { thumbnailImage, handleFileChange, handleAddClick, handleRemove } =
    useImageHandler(onImageUpload, initialImage, "user-icon-input");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //画像がセットされたら、isSubmittingをfalseにする(ボタン表示処理)
  useEffect(() => {
    if (thumbnailImage) {
      setIsSubmitting(false); // 画像が表示されたら「追加中...」→「追加」に戻す
    }
  }, [thumbnailImage]); // thumbnailImage が変わったときに実行される

  const handleAddClickWithSubmitFlag = () => {
    if (isSubmitting) return; // 送信中であれば追加しない
    setIsSubmitting(true); // 送信中フラグを設定
    handleAddClick(); // 実際の画像追加処理
  };

  return (
    <div className="flex flex-col items-center sm:items-center w-full space-y-5">
      {/* ユーザーアイコン */}
      <div className="relative w-32 h-32">
        {thumbnailImage ? (
          <Image
            src={thumbnailImage}
            alt="User Icon"
            className="rounded-full object-cover"
            fill
            sizes="(max-width: 640px) 96px, 128px"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
            <i className="bi bi-camera text-xl sm:text-2xl text-gray-500"></i>
          </div>
        )}
      </div>
  
      <input
        id="user-icon-input"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
  
      {/* 追加・削除ボタン */}
      <div className="flex justify-center items-center space-x-6 pt-4 sm:flex-nowrap sm:space-x-4">
        <Button
          type="button"
          variant="primary"
          onClick={handleAddClickWithSubmitFlag}
        >
          {isSubmitting ? "追加中..." : "追加"}
        </Button>
  
        <Button
          type="button"
          variant="danger"
          onClick={handleRemove}
        >
          削除
        </Button>
      </div>
    </div>
  );
  
};
