import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

// Dynamic imports for browser-only libraries
const importHeic2any = () => import("heic2any");
const importImageCompression = () => import("browser-image-compression");

type UseImageHandlerReturn = {
  thumbnailImage: string | null;
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

  useEffect(() => {
    if (initialImage) {
      setThumbnailImage(initialImage);
    }
  }, [initialImage]);

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

  const uploadFile = async (file: File) => {
    if (!token) {
      alert("認証エラー: もう一度ログインしてください");
      return;
    }

    const sanitizedFileName = file.name
      .replace(/[^a-zA-Z0-9.]/g, "_")
      .toLowerCase();

    const filePath = `uploads/${uuidv4()}-${sanitizedFileName}`;

    const { error } = await supabase.storage
      .from("thumbnailImage")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    }
  };

  const handleAddClick = () => {
    document.getElementById(inputId)?.click();
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
      onImageUpload('');

    } catch (error) {
      console.error("画像削除エラー:", error);
      alert('画像の削除に失敗しました');
    }
  };

  return {
    thumbnailImage,
    handleFileChange,
    handleAddClick,
    handleRemove,
  };
};
