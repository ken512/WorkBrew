"use client";
import React, { useState } from "react";
import { supabase } from "@/_utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

// heic2any と browser-image-compression を動的にインポート
const importHeic2any = () => import("heic2any");
const importImageCompression = () => import("browser-image-compression");

type UseImageHandlerReturn = {
  thumbnailImage: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  uploadJudgment: number | null;
  downloadJudgment: number | null;
  measureDownloadSpeed: () => Promise<void>;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  handleAddClick: () => void;
  handleRemove: () => Promise<void>;
};

export const useImageHandler = (
  onImageUpload: (imageUrl: string) => void,
  initialImage?: string,
  inputId: string = "file-input"
): UseImageHandlerReturn => {
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(
    initialImage || null
  );
  const { token } = useSupabaseSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadJudgment, setUploadJudgment] = useState<number | null>(null);
  const [ downloadJudgment, setDownloadJudgment] = useState<number | null>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ファイルタイプの検証を追加
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/heic",
      "image/heif",
    ];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      alert("JPG、PNG、HEICのみアップロード可能です");
      return;
    }

    // ファイルサイズの検証を追加
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert("ファイルサイズは10MB以下にしてください");
      return;
    }

    try {
      const converted = await convertFile(file);
      if (!converted) {
        alert("画像の変換に失敗しました");
        return;
      }

      const compressed = await compressImage(converted);
      if (compressed) {
        await uploadFile(compressed);
      } else {
        alert("画像の圧縮に失敗しました");
      }
    } catch (error) {
      console.error("画像処理エラー:", error);
      alert("画像のアップロードに失敗しました");
    }
  };

  //ファイル変換処理
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

  //画像の圧縮処理
  const compressImage = async (file: File): Promise<File | null> => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1200,
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


  //アップロード処理
  const uploadFile = async (file: File) => {
    if (!token) {
      alert("認証エラー: もう一度ログインしてください");
      return;
    }

    const sanitizedFileName = file.name
      .replace(/[^a-zA-Z0-9.]/g, "_")
      .toLowerCase();
    const filePath = `uploads/${uuidv4()}-${sanitizedFileName}`;

    //アップロード開始前のタイムスタンプ
    const uploadStartTime = performance.now();

    const { error } = await supabase.storage
      .from("thumbnailImage")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    //アップロード終了時のタイムスタンプ
    const uploadEndTime = performance.now();
    //アップロードにかかった時間(秒)
    let uploadDuration = (uploadEndTime - uploadStartTime) / 1000;
    //0 秒未満の計測を防ぐ (最低 0.01秒)
    uploadDuration = Math.max(uploadDuration, 0.01);
    //ファイルサイズ取得
    const fileSizeInBits = file.size * 8;

    //Mbps（メガビット毎秒）換算
    const uploadSpeed = fileSizeInBits / uploadDuration / (1024 * 1024);
    //アップロード速度をセット
    setUploadJudgment(uploadSpeed);

    if (error) {
      alert(`アップロードに失敗しました: ${error.message}`);
      return;
    }

    const { data } = supabase.storage
      .from("thumbnailImage")
      .getPublicUrl(filePath);
    if (data?.publicUrl) {
      setThumbnailImage(data.publicUrl);
      onImageUpload(data.publicUrl);
      setIsSubmitting(false); // アップロード完了後、送信フラグをfalseに戻す
    }
  };

  //ダウンロード速度判定の関数
  const measureDownloadSpeed = async() => {
    //Cloudflareのスピードテスト用のファイル
    const testFileUrl = "https://speed.cloudflare.com/__down?bytes=1048576";
    
    try {
      const downloadStartTime = performance.now();  //ダウンロード開始時間
      const response = await fetch(testFileUrl);
      const blob = await response.blob(); //ダウンロード完了
      const downloadEndTime = performance.now(); //ダウンロード終了時間

      const fileSizeInBits = blob.size * 8; // ファイルサイズ（ビット換算）
      const downloadDuration = (downloadEndTime - downloadStartTime) / 1000; //ダウンロード時間（秒

      const downloadSpeed = fileSizeInBits / downloadDuration / (1024 * 1024); // 速度計算（Mbps）

      setDownloadJudgment(downloadSpeed); //UI更新

    } catch(error) {
      console.error("ダウンロード速度測定エラー:", error);
      alert("ダウンロード速度測定に失敗しました");
    }
  }

  const handleAddClick = () => {
    // ファイル選択ボタンをクリックする
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement && !isSubmitting) {
      inputElement.click();
      setIsSubmitting(true);
    }
  };

  const handleRemove = async () => {
    if (!token) {
      alert("認証エラー: もう一度ログインしてください");
      return;
    }

    try {
      if (thumbnailImage) {
        // URLからファイルパスを抽出
        const filePathMatch = thumbnailImage.match(/thumbnailImage\/(.+)$/);
        if (filePathMatch) {
          const filePath = filePathMatch[1];

          // Supabaseストレージから画像を削除
          const { error } = await supabase.storage
            .from("thumbnailImage")
            .remove([filePath]);

          if (error) {
            throw error;
          }
        }
      }

      // 状態をリセット
      setThumbnailImage(null);
      onImageUpload("");
    } catch (error) {
      console.error("画像削除エラー:", error);
      alert("画像の削除に失敗しました");
    }
  };

  return {
    thumbnailImage,
    uploadJudgment,
    downloadJudgment,
    measureDownloadSpeed,
    handleFileChange,
    handleAddClick,
    handleRemove,
    isSubmitting,
    setIsSubmitting,
  };
};
