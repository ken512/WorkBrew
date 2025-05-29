"use client";
import React, { FormEvent, useState } from "react";
import { Input } from "@/app/_components/Input";
import { CafeFormFields } from "../_data/cafeFormFields";
import { CafePostButtons } from "./CafePostButtons";
import { ButtonFields } from "../_data/buttonFields";
import { PostClearButton } from "./PostClearButton";
import { TextArea } from "@/app/_components/TextArea";
import { FormErrorsType } from "@/app/_types/FormErrorsType";
import { CafeFormStateReturn } from "../_types/CafeFormStateReturn";
import { WifiSpeed, WifiStability, SeatAvailability } from "@prisma/client";
import useSWR, { mutate } from "swr";
import api from "@/_utils/api";
import toast, { Toaster } from "react-hot-toast";
import "../../globals.css";

//共通リクエストを使用する
const fetcher = (url: string) => api.get(url);

//Geocoding API用のfetcherを定義
const fetchGeocode = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK" || data.results.length === 0) {
    throw new Error("住所の緯度・経度を取得できませんでした");
  }
  const { lat, lng } = data.results[0].geometry.location;
  return `${lat}, ${lng}`;
};

export const CafePostForm: React.FC<CafeFormStateReturn> = ({
  formState,
  setFormState,
  onChange,
  clearForm,
}) => {
  const [errors, setErrors] = useState<FormErrorsType>({});
  const [clearSignal, setClearSignal] = useState(false);
  const [rating, setRating] = useState(3); // 星評価の状態
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // エラーメッセージ用の状態
  const [isSubmitting, setIsSubmitting] = useState(false);

  //  SWRを使ったデータ取得
  useSWR("/api/admin/cafe_submission_form", ([url]) => fetcher(url), {
    shouldRetryOnError: false, // エラーが発生しても再試行しない
    onSuccess: (data) => {
      if (data?.cafe) setFormState(data.cafe);
    },
  });

  // Geocoding APIをSWRで管理
  useSWR(
    formState.storeAddress
      ? `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          formState.storeAddress
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
      : null,
    fetchGeocode,
    {
      onSuccess: (coordinates) => {
        setFormState((prevState) => ({
          ...prevState,
          locationCoordinates: coordinates,
        }));
      },
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    console.log("送信データ:", formState);
    e.preventDefault();

    // バリデーションチェック
    const hasErrors = await validateForm();
    if (hasErrors) {
      return; // エラーがあれば投稿を中止
    }
    if (isSubmitting) return; // 再送信を防ぐ
    setIsSubmitting(true); // 送信中フラグを立てる

    try {
      // 画像がない場合、デフォルト画像をセット
      const defaultImage = "https://placehold.jp/600x350/?text=デフォルト";
      const finalThumbnail = formState.thumbnailImage || defaultImage;

      // post関数を使用してデータを送信
      const response = await api.post("/api/admin/cafe_submission_form", {
        ...formState,
        thumbnailImage: finalThumbnail,
      });
      console.log("API Response:", response);
      toast.success("カフェ投稿しました！");
      mutate(["/api/admin/cafe_submission_form"]); // mutate で最新データを取得
    } catch (error) {
      console.error("投稿に失敗しました:", error);
      toast.error("投稿に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = async () => {
    const tempErrors: FormErrorsType = {};
    if (!formState.cafeName) tempErrors.cafeName = "※必須";

    // Wi‑Fi有無の必須チェック（null のみ）
    if (formState.wifiAvailable === null) {
      tempErrors.wifiAvailable = "※必須";
    } else if (formState.wifiAvailable === true) {
      // 有 のときだけ速度・安定性を必須
      if (formState.wifiSpeed === null) tempErrors.wifiSpeed = "※必須";
      if (formState.wifiStability === null) tempErrors.wifiStability = "※必須";
    }

    // 電源有無も同様
    if (formState.powerOutlets === null) {
      tempErrors.powerOutlets = "※必須";
    }

    // 空席状況はもともと null チェックなので OK
    if (formState.seatAvailability === null) {
      tempErrors.seatAvailability = "※必須";
    }

    // 営業時間のバリデーション
    const timeFormat =
      /^([01]?\d|2[0-3]):([0-5]\d) - ([01]?\d|2[0-8]):([0-5]\d)$/; //00:00〜28:59まで許可
    if (!formState.businessHours.trim()) {
      tempErrors.businessHours = "※必須";
    } else if (!timeFormat.test(formState.businessHours.trim())) {
      tempErrors.businessHours = "HH:MM - HH:MM の形式で入力してください！";
      toast.error(tempErrors.businessHours);
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);

      // 全体エラー（必須未入力）がある場合だけ、汎用メッセージを出す
      const hasRequiredMissing = Object.values(tempErrors).some(
        (msg) => msg === "※必須"
      );
      if (hasRequiredMissing) {
        toast.error("必須項目は入力してください！！");
      }
      return true;
    } // エラーが1つでもあると `true` を返す

    setErrors({});
    return false; // エラーなし → 投稿を続行
  };

  const convertSelection = (
    option: string,
    fieldName: string
  ): WifiSpeed | WifiStability | SeatAvailability | number | boolean | null => {
    console.log(option, fieldName); // デバッグ用ログ

    switch (fieldName) {
      case "wifiAvailable":
        if (option === "有") {
          setErrorMessage(null); // エラーメッセージをリセット
          return true;
        }
        return false;

      case "wifiSpeed":
        if (!formState.wifiAvailable) {
          setErrorMessage(
            "Wi-Fiの有無が「無」の場合、Wi-Fi速度を選択できません。"
          );
          return null;
        }
        switch (option) {
          case "高速":
            return WifiSpeed.HIGH;
          case "中速":
            return WifiSpeed.MEDIUM;
          case "低速":
            return WifiSpeed.LOW;
          default:
            return null;
        }

      case "wifiStability":
        if (!formState.wifiAvailable) {
          setErrorMessage(
            "Wi-Fiの有無が「無」の場合、Wi-Fi安定性を選択できません。"
          );
          return null;
        }
        switch (option) {
          case "非常に安定":
            return WifiStability.VERY_STABLE;
          case "安定":
            return WifiStability.STABLE;
          case "不安定":
            return WifiStability.UNSTABLE;
          default:
            return null;
        }

      case "powerOutlets":
        return option === "有"; // "有" → true, "無" → false

      case "seatAvailability":
        switch (option) {
          case "空いている":
            return SeatAvailability.AVAILABLE;
          case "混雑中":
            return SeatAvailability.CROWDED;
          case "満席":
            return SeatAvailability.FULL;
          default:
            return false;
        }

      case "starRating":
        return Number(option) || 0; // 数値に変換

      default:
        return false;
    }
  };

  //カフェ投稿クリア
  const handleClear = () => {
    clearForm();
    setClearSignal(true); // クリアシグナルを発火
    setRating(0);
    // 次のレンダリングでクリアシグナルをリセット
    setTimeout(() => setClearSignal(false), 0);
  };

  return (
    <div className="flex flex-col items-center py-40 sm:px-4 sm:text-sm">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="sm:w-full sm:max-w-[350px]">
        {CafeFormFields.map(({ name, label, placeholder, required }) => (
          <div key={name} className="py-2 font-bold w-[700px] sm:w-full">
            <div className="flex items-center mb-2">
              <label className="text-gray-700 mr-2">{label}</label>
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
            <Input
              type="text"
              name={name}
              id={name}
              value={String(formState[name as keyof typeof formState] ?? "")}
              placeholder={placeholder}
              onChange={onChange}
              required={required}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-5"
            />
          </div>
        ))}

        <div className="mt-10 sm:mt-6">
          {ButtonFields.map(({ label, options, fieldName }) => (
            <CafePostButtons
              key={fieldName}
              label={label}
              options={options}
              error={errors[fieldName]}
              clearSignal={clearSignal} // クリアシグナルを渡す
              disabled={
                formState.wifiAvailable === false &&
                (fieldName === "wifiSpeed" || fieldName === "wifiStability")
              } // Wi-Fiが「無」の場合は選択不可
              onSelect={(selected: string) => {
                if (
                  formState.wifiAvailable === false &&
                  (fieldName === "wifiSpeed" || fieldName === "wifiStability")
                ) {
                  return; // Wi-Fiの有無が「無」なら選択できない
                }
                const convertedValue = convertSelection(selected, fieldName);
                setFormState((prevState) => ({
                  ...prevState,
                  [fieldName]: convertedValue,
                }));
              }}
            />
          ))}
        </div>
        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}
        <div className="mt-10 sm:text-sm sm:p-5 sm:max-w-[350px] ">
          <TextArea
            label="コメント欄（カフェの感想やおすすめポイントを記入してください）"
            placeholder="500文字以内"
            value={formState.comment}
            maxLength={500}
            name="comment"
            onChange={onChange}
            rows={15}
            col={80}
          />
        </div>
        <PostClearButton
          onSubmit={handleSubmit}
          onClear={handleClear}
          isSubmitting={isSubmitting}
          starRating={rating}
        />
      </form>
    </div>
  );
};
