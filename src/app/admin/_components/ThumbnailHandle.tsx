"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/app/admin/_components/Button";
import "../../globals.css";
import { useImageHandler } from "@/app/admin/_hooks/useImageHandler";

export const ThumbnailHandle: React.FC<{
  onImageUpload: (imageUrl: string) => void;
  initialImage?: string;
}> = ({ onImageUpload, initialImage }) => {
  const {
    thumbnailImage,
    handleFileChange,
    handleAddClick,
    handleRemove
  } = useImageHandler(onImageUpload, initialImage, "thumbnail-input");

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full h-64">
        {thumbnailImage ? (
          <Image
            src={thumbnailImage}
            alt="Thumbnail"
            className="rounded-lg object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
            <i className="bi bi-camera text-3xl text-gray-500"></i>
          </div>
        )}
      </div>
      <input
        id="thumbnail-input"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex space-x-4">
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
