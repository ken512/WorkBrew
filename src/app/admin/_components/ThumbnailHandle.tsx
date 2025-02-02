"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import heic2any from "heic2any";
import Image from "next/image";
import imageCompression from "browser-image-compression";

import { Label } from "@/app/_components/Label";
import "../../globals.css";

export const ThumbnailHandle: React.FC = () => {
  const [convertedFile, setConvertedFile] = useState<File | null>(null);
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
      setConvertedFile(compressed); // 状態を更新
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

  return (
    <div className="text-center">
      <Label
        htmlFor="file-input"
        className="btn btn-secondary rounded-full w-15 h-15 flex items-center justify-center cursor-pointer"
      >
        <i className="i bi-camera text-xl"></i>
      </Label>
      <input
        id="file-input"
        type="file"
        className="hidden"
        placeholder="サムネイルURLを入力してください。"
        onChange={handleFileChange}
      />
      {convertedFile && (
        <div className="mt-3">
        <Image
          src={URL.createObjectURL(convertedFile)}
          alt="Converted Preview"
          className="rounded"
          width={400}
          height={400}
        />
        </div>
      )}
      {thumbnailImage && <Image src={thumbnailImage} alt="Thumbnail" />}
    </div>
  );
};
