"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/app/admin/_components/Button";
import "../../globals.css";
import { useImageHandler } from "@/app/admin/_hooks/useImageHandler";

export const UserIcon: React.FC<{
  onImageUpload: (imageUrl: string) => void;
  initialImage?: string;
}> = ({ onImageUpload, initialImage }) => {
  const {
    thumbnailImage,
    handleFileChange,
    handleAddClick,
    handleRemove
  } = useImageHandler(onImageUpload, initialImage, "user-icon-input");

  return (
    <div className="flex justify-center items-center w-full sm:w-1/2 space-y-4">
      {/* ユーザーアイコン */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
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
      <div className="pt-20 px-10 space-x-4">
        <Button
          type="button"
          variant="primary"
          onClick={handleAddClick}
        >
          追加
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
