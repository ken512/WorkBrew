"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Button } from "@/app/admin/_components/Button";
import "../../globals.css";

// Dynamic imports for browser-only libraries
const importHeic2any = () => import('heic2any');
const importImageCompression = () => import('browser-image-compression');

export const UserIcon: React.FC<{
  onImageUpload: (imageUrl: string) => void;
  initialImage?: string;
}> = ({ onImageUpload, initialImage }) => {
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(initialImage || null);
  const {token} = useSupabaseSession();

  // initialImageの変更を監視
  useEffect(() => {
    if (initialImage) {
      setThumbnailImage(initialImage);
    }
  }, [initialImage]);

  const fetchImageUrl = async (path: string) => {
    const { data } = supabase.storage.from("thumbnailImage").getPublicUrl(path);
    if (data?.publicUrl) {
      setThumbnailImage(data.publicUrl);
    } else {
      console.error("URL取得失敗");
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ファイルタイプの検証を追加
    const allowedTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/heif'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      alert('JPG、PNG、HEICのみアップロード可能です');
      return;
    }

    // ファイルサイズの検証を追加
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('ファイルサイズは10MB以下にしてください');
      return;
    }

    try {
      //HEIC/HEIF形式をJPEGに変換
      const converted = await convertFile(file);
      if(!converted) {
        alert('画像の変換に失敗しました');
        return;
      }

      //圧縮処理
      const compressed = await compressImage(converted);
      if (compressed) {
        await uploadFile(compressed);
      } else {
        alert('画像の圧縮に失敗しました');
      }
    } catch (error) {
      console.error('画像処理エラー:', error);
      alert('画像のアップロードに失敗しました');
    }
  };

  const convertFile = async (file: File): Promise<File | null> => {
    if (file.type === "image/heic" || file.type === "image/heif") {
      try {
        const heic2any = (await importHeic2any()).default;
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
      const imageCompression = (await importImageCompression()).default;
      const compressedBlob = await imageCompression(file, options);
      return new File([compressedBlob], file.name, { type: file.type });
    } catch (error) {
      console.error("圧縮失敗", error);
      return null;
    }
  };

  const uploadFile = async (file: File) => {
    if (!token) {
      alert('認証エラー: もう一度ログインしてください');
      return;
    }

    const sanitizedFileName = file.name
      .replace(/[^a-zA-Z0-9.]/g, '_')
      .toLowerCase();
      
    const filePath = `uploads/${uuidv4()}-${sanitizedFileName}`;
    
    const { error } = await supabase.storage
      .from("thumbnailImage")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    if (error) {
      alert(`アップロードに失敗しました: ${error.message}`);
      return;
    }

    // 画像URLを取得して親コンポーネントに通知
    const { data } = supabase.storage.from("thumbnailImage").getPublicUrl(filePath);
    if (data?.publicUrl) {
      setThumbnailImage(data.publicUrl);
      onImageUpload(data.publicUrl);
    }
  };

  const handleAddClick = () => {
    document.getElementById("file-input")?.click();
  };
  const handleRemoveClick = async () => {
    if (!token) {
      alert('認証エラー: もう一度ログインしてください');
      return;
    }

    try {
      if (thumbnailImage) {
        // URLからファイルパスを抽出
        const filePathMatch = thumbnailImage.match(/thumbnailImage\/(.+)$/);
        if (filePathMatch) {
          const filePath = filePathMatch[1];
          
          // Supabaseのストレージから画像を削除
          const { error } = await supabase.storage
            .from("thumbnailImage")
            .remove([filePath]);

          if (error) {
            throw error;
          }
        }
      }

      // ローカルの状態をクリア
      setThumbnailImage(null);
      // 親コンポーネントに空の文字列を渡して状態をクリア
      onImageUpload('');

    } catch (error) {
      console.error("画像削除エラー:", error);
      alert('画像の削除に失敗しました');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32">
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
