"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import heic2any from "heic2any";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { Label } from "@/app/_components/Label";
import { Button } from "@/app/admin/_components/Button";
import "../../globals.css";

export const UserIcon: React.FC = () => {
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(null);

  useEffect(() => {
    if (thumbnailImage) {
      fetchImageUrl(thumbnailImage);
    }
  }, [thumbnailImage]);

  const fetchImageUrl = async (path: string) => {
    const { data } = supabase.storage.from("thumbnailImage").getPublicUrl(path);
    if (data?.publicUrl) {
      setThumbnailImage(data.publicUrl);
    } else {
      console.error("URL取得失敗");
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    //HEIC/HEIF形式をJPEGに変換
    const converted = await convertFile(file);
    if(!converted) return;

    //圧縮処理
    const compressed = await compressImage(converted);
    if (compressed) {
      uploadFile(compressed); // アップロード
    }
  };

  const convertFile = async (file: File): Promise<File | null> => {
    if (file.type === "image/heic" || file.type === "image/heif") {
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
        });
        return new File(
          [convertedBlob as Blob],
          file.name.replace(/\.\w+$/, ".jpg"),
          {
            type: "image/jpeg",
          }
        );
      } catch (error) {
        console.error("変換失敗", error);
        return null;
      }
    }
    return file;
  };
  //画像を圧縮処理
  const compressImage = async (file: File): Promise<File | null> => {
    const options = {
      maxSizeMB: 1, // 最大ファイルサイズ (1MB)
      maxWidthOrHeight: 1200, // 最大の横幅または高さ
      useWebWorker: true,
    };
    try {
      const compressedBlob = await imageCompression(file, options);
      return new File([compressedBlob], file.name, { type: file.type });
    } catch (error) {
      console.error("圧縮失敗", error);
      return null;
    }
  };


  const uploadFile = async (file: File) => {
    const filePath = `uploads/${uuidv4()}-${file.name}`;
    const { error } = await supabase.storage
      .from("thumbnailImage")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      alert(`アップロードに失敗しました: ${error.message}`);
      return;
    }

    fetchImageUrl(filePath);
  };

  const handleAddClick = () => {
    document.getElementById("file-input")?.click();
  };
  const handleRemoveClick = () => {
    setThumbnailImage(null);
    // サーバーからも削除する場合は、ここで削除処理を追加
    console.log("アイコン削除");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-32 h-32">
        {thumbnailImage ? (
          <Image
            src={thumbnailImage}
            alt="User Icon"
            className="rounded-full object-cover"
            fill
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
            <i className="bi bi-camera text-2xl text-gray-500"></i>
          </div>
        )}
        <Label
          htmlFor="file-input"
          className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700"
        >
          <i className="bi bi-upload"></i>
        </Label>
      </div>
      <input
        id="file-input"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="px-3">
      <Button
        type="button"
        className="px-5 bg-beige-200 rounded-3xl font-bold hover:bg-custom-green"
        onClick={handleAddClick}
      >
        追加
      </Button>
      </div>
      <div className="px-3">
      <Button
        type="button"
        className="px-5 bg-custom-red rounded-3xl font-bold hover:bg-custom-green"
        onClick={handleRemoveClick}
      >
        削除
      </Button>
      </div>
    </div>
  );
};
