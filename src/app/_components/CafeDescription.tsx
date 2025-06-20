"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import { RenderStars } from "../admin/_utils/renderStars";
import { isValidUrl } from "../admin/_utils/urlGeneration";
import {
  convertWifiAvailable,
  convertWifiSpeed,
  convertWifiStability,
  convertSeatAvailability,
  convertPowerOutlets,
} from "../admin/_utils/convertLabels";
import { initMap } from "../admin/_utils/initMap";
import Script from "next/script";
import { CafePostButtons } from "../admin/_components/CafePostButtons";
import { useImageHandler } from "../admin/_hooks/useImageHandler";
import { UpdateStatus } from "../_types/UpdateStatus";
import { ButtonFields } from "../admin/_data/buttonFields";
import { Button } from "../admin/_components/Button";
import { convertJapaneseToEnglish } from "@/_utils/convertJapaneseToEnglish";
import { PieChartData } from "../_types/PieChartProps";
import { CafeStatusPieChart } from "./CafeStatusPieChart";
import "../globals.css";
import { Cafe } from "../_types/Cafe";
import { supabase } from "@/_utils/supabase";
import toast, { Toaster } from "react-hot-toast";
import api from "@/_utils/api";
import Link from "next/link";

//共通リクエストを使用する
const fetcher = (url: string) => api.get(url);

type UpdateHandlers = {
  updateWiFiAndSeatStatus: UpdateStatus;
  setUpdateWiFiAndSeatStatus: React.Dispatch<
    React.SetStateAction<UpdateStatus>
  >;
  updateState: (key: keyof UpdateStatus, value: string) => void;
  onUpdate: (e: React.FormEvent) => void;
};

//ButtonFieldsから特定の項目を絞り出し、CafePostButtonsに渡す用のデータを整える
const fieldsToShow = ButtonFields.filter(
  (
    field //ButtonFields の中から、Wi-Fi速度 と 空席状況 に関する情報だけを取り出す
  ) => ["wifiSpeed", "seatAvailability"].includes(field.fieldName) //この2つとも含まれているか？
).map((field) => ({
  label: field.label, //UIに表示するラベル
  options: field.options, //ボタンで使う選択肢
  key: field.fieldName as keyof UpdateStatus, //更新対象のフィールド名(UpdateStatus型を使うためにkeyof UpdateStatusを付けてる)
}));

export const CafeDescription: React.FC<UpdateHandlers> = ({
  onUpdate,
  updateWiFiAndSeatStatus,
  setUpdateWiFiAndSeatStatus,
}) => {
  const [, setMap] = useState<google.maps.Map | null>(null);
  const { id } = useParams();
  const searchParams = useSearchParams();
  const from = searchParams.get("from"); //詳細ページでuseSearchParamsを使ってfrom を取得
  const [cafes] = useState<Cafe>();
  const router = useRouter();
  const [wifiAvailable, setWifiAvailable] = useState<boolean | null>(null);

  //onImageUploadを使わない前提で、エラー回避用のダミー関数
  const handleUpload = (url: string) => {
    console.log("アップロードされた画像URL:", url);
  };

  const { downloadJudgment, measureDownloadSpeed } =
    useImageHandler(handleUpload);
  const {
    data = { cafes: {} },
    error,
    isLoading,
  } = useSWR(`/api/public/cafe_post/${id}`, fetcher);
  // cafeオブジェクトを取得
  const cafe = data.cafes;

  // cafeオブジェクトのwifiAvailableを取得する
  useEffect(() => {
    if (cafe && cafe.wifiAvailable !== undefined) {
      setWifiAvailable(cafe.wifiAvailable);
    }
  }, [cafe]);

  //クライアント側で使える状態になったら描画させる
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.google &&
      window.google.maps &&
      cafe.locationCoordinates
    ) {
      initMap(setMap, [cafe]); // 1件だけでも配列に
    }
  }, [cafe.locationCoordinates, cafe]);
  console.log("地図", cafe.locationCoordinates);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    //tokenを保存して、削除制限 を設ける(投稿主のみ削除可)
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    // トークンが保存されていない場合
    if (!token) {
      console.error("トークンが保存されていません");
      toast.error("ログインしていないため、削除できません。");
      return; // トークンがない場合は処理を停止
    } else {
      console.log("保存されたトークン:", token);
    }

    if (id) {
      try {
        const res = await api.delete(`/api/public/cafe_post/${id}`, cafes);
        toast.success(res.message || "削除しました!!");
        setTimeout(() => {
        router.push("/cafe_post");
        }, 3000);
      } catch (error: any) {
        const message = error?.message;

        if (
          message ===
          "お気に入りに登録しているカフェは削除できません。まずお気に入りから解除してください。"
        ) {
          toast.error(message);
        } else if (
          message === "他のユーザーの投稿を削除する権限はありません!!"
        ) {
          toast.error(message);
        } else {
          toast.error("予期せぬエラーが発生しました");
        }
        return;
      }
    }
  };

  const cafesArray = data?.relatedCafes || []; // グラフ集計用

  {
    /*同じカフェ名と住所を持つ複数の投稿データを対象に、Wi-Fi速度と空席状況の情報を集計し、グラフ表示用の形式に変換する関数*/
  }
  const generateChartData = (cafes: any[]): PieChartData => {
    const categories = ["wifiSpeed", "seatAvailability"]; //集計対象のフィールド指定
    const result: PieChartData = {}; //カテゴリごとにデータを格納

    //Wi-Fi速度と空席状況を一つずつ処理
    categories.forEach((category) => {
      const options =
        ButtonFields.find((f) => f.fieldName === category)?.options || []; //ButtonFields（ボタン用設定）から、対象カテゴリの選択肢（例：["高速", "中速", "低速"]）を取得。

      //各選択肢（option）をキーにして、初期値 0 のカウント用オブジェクトを作成
      const counts: { [key: string]: number } = {};
      options.forEach((option) => {
        counts[option] = 0; // 初期化
      });
      //投稿されたカフェ配列をループして、該当カテゴリ(wifiSpeed)の値を取得
      cafes.forEach((cafe) => {
        const raw = cafe[category];
        if (!raw) return;
        //enum値を日本語に変換
        const jp =
          category === "wifiSpeed"
            ? convertWifiSpeed(raw)
            : convertSeatAvailability(raw);
        //変換がの日本語の値を、カウント増加
        if (jp in counts) counts[jp]++;
      });
      //合計投稿数を算出
      const total = Object.values(counts).reduce((sum, val) => sum + val, 0);
      //グラフ用データに変換
      result[category] = options.map((name) => ({
        name, //日本語の選択肢(ラベル)
        count: counts[name], //選択された件数
        percentage: total ? Math.floor((counts[name] / total) * 100) : 0, //全体に対する割合(小数点切り捨て)
      }));
    });

    return result;
  };
  //戻るボタン処理で from を使い分ける関数
  const handleBack = () => {
    if (from === "favorites") {
      router.push("/admin/cafe_favorites"); // お気に入り一覧へ
    } else {
      router.push("/cafe_post"); // 通常の投稿一覧へ
    }
  };

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">
          ☕️ コーヒーを淹れています... お待ちください
        </p>
      </div>
    );
  }

  if (error) return <div>データの取得に失敗しました</div>;

  const updateState = (key: keyof UpdateStatus, value: string) => {
    const converted = convertJapaneseToEnglish(key, value);
    console.log("選択された", key, value);
    setUpdateWiFiAndSeatStatus((prevState) => ({
      ...prevState,
      [key]: converted,
    }));
  };

  return (
    <div className="font-bold max-w-[600px] w-full mx-auto sm:text-sm md:text-xl">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative py-6">
        <h1 className="text-[min(13vw,30px)] mb-[100px] pt-[100px] text-center sm:text-sm md:text-xl">
          カフェ詳細
        </h1>
        <Link href={`/cafe_post/${cafe.id}/edit`} className="text-black">編集する</Link>
        <button>
          <a
            className="absolute right-4  px-5 py-2 mt-[70px] rounded-full text-black bg-custom-red hover:bg-custom-green "
            onClick={handleBack}
          >
            戻る
          </a>
        </button>
      </div>
      <div className="max-w-[600px] mt-10">
        <div className="mx-4">
          {/* ユーザー情報 */}
          <div className="flex items-star justify-between gap-12 flex-col items-start">
            <div className="flex items-center gap-2">
              <Image
                src={cafe.users.profileIcon}
                alt="Profile Image"
                className="rounded-full aspect-square"
                width={50}
                height={50}
              />
              <p className="text-sm font-bold">{cafe.users.userName}</p>
            </div>

            {/* カフェ名 */}
            <p className="text-sm font-semibold break-words sm:text-base mt-4">
              {cafe.cafeName}
            </p>
          </div>
          {/*  サムネイル画像 */}
          <div className="relative w-full max-w-[600px] h-[400px] sm:h-[300px] mt-2">
            <Image
              src={cafe.thumbnailImage}
              alt="Cafe Thumbnail"
              className="rounded-lg object-cover"
              layout="fill"
            />
          </div>
          {/* カフェ情報詳細 */}
          <div className="font-bold flex flex-col gap-12 text-lg sm:text-sm">
            <p className=" mt-[100px]">
              星評価: {RenderStars(cafe.starRating)}
            </p>
            <p>エリア: {cafe.area}</p>
            <p>
              営業時間:{" "}
              {cafe.openingTime && cafe.closingHours
                ? `${cafe.openingTime} - ${cafe.closingHours}`
                : "情報なし"}
            </p>
            {isValidUrl(cafe.cafeUrl) && (
              <div className="flex flex-col sm:flex-row">
                お店のURL:
                <a
                  href={cafe.cafeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 underline flex items-center px-2 break-normal sm:break-all"
                >
                  {cafe.cafeUrl}
                </a>
              </div>
            )}
            <p>定休日: {cafe.closingDays}</p>
            <div className="flex">
              <p>Wi-Fiの有無:</p>
              <span
                className={`px-3 py-1 rounded-lg text-black ml-2 ${
                  String(cafe.wifiAvailable).toUpperCase() === "TRUE"
                    ? "bg-custom-red"
                    : "bg-custom-blue"
                }`}
              >
                {convertWifiAvailable(cafe.wifiAvailable)}
              </span>
            </div>
            <div className="flex">
              <p>Wi-Fi速度: </p>
              <span
                className={`px-3 py-1 rounded-lg text-black ml-2 ${
                  (updateWiFiAndSeatStatus.wifiSpeed ??
                    (cafe.wifiSpeed as string)) === "HIGH"
                    ? "bg-custom-green"
                    : (updateWiFiAndSeatStatus.wifiSpeed ??
                        (cafe.wifiSpeed as string)) === "MEDIUM"
                    ? "bg-custom-orange"
                    : "bg-custom-red"
                }`}
              >
                {convertWifiSpeed(
                  updateWiFiAndSeatStatus.wifiSpeed ??
                    (cafe.wifiSpeed as string)
                )}
              </span>
            </div>
            <div className="flex">
              <p>Wi-Fi安定: </p>
              <span
                className={`px-3 py-1 rounded-lg text-black ml-2 ${
                  cafe.wifiStability === "VERY_STABLE"
                    ? "bg-custom-green"
                    : cafe.wifiStability === "STABLE"
                    ? "bg-custom-orange"
                    : "bg-custom-red"
                }`}
              >
                {convertWifiStability(cafe.wifiStability)}
              </span>
            </div>
            <div className="flex">
              <p>電源の有無:</p>
              <span
                className={`px-3 py-1 rounded-lg text-black ml-2 ${
                  String(cafe.powerOutlets).toUpperCase() === "TRUE"
                    ? "bg-custom-red"
                    : "bg-custom-blue"
                }`}
              >
                {convertPowerOutlets(cafe.powerOutlets)}
              </span>
            </div>
            <div className="flex">
              <p>空席状況: </p>
              <span
                className={`px-3 py-1 rounded-lg text-black ml-2 ${
                  (updateWiFiAndSeatStatus.seatAvailability ??
                    (cafe.seatAvailability as string)) === "AVAILABLE"
                    ? "bg-custom-green"
                    : (updateWiFiAndSeatStatus.seatAvailability ??
                        (cafe.seatAvailability as string)) === "CROWDED"
                    ? "bg-custom-orange"
                    : "bg-custom-red"
                }`}
              >
                {convertSeatAvailability(
                  updateWiFiAndSeatStatus.seatAvailability ??
                    (cafe.seatAvailability as string)
                )}
              </span>
            </div>
          </div>

          {/* Googleマップ表示*/}
          <div
            id="map"
            className="my-10 rounded-lg shadow-md h-[400px] w-full border border-blue-500"
          />
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
            onLoad={() => {
              if (cafe.locationCoordinates) {
                initMap(setMap, [cafe]); // 配列にする
              }
            }} //Google Maps API のスクリプトが完全に読み込まれた後に実行(undefinedにならないために)
            strategy="afterInteractive"
          />
          {/*空席状況・Wi-Fi速度報告*/}
          <div className="pt-10">
            {fieldsToShow.map(({ label, options, key }) => {
              //Availableがfalseの場合のみ、Wi-Fi速度の選択肢ボタンを非表示
              if (key === "wifiSpeed" && wifiAvailable === false) {
                return null; // Wi-Fi速度が表示されないようにする
              }
              return (
                <CafePostButtons
                  key={label}
                  label={label}
                  options={options}
                  onSelect={(selected) => {
                    updateState(key, selected);
                  }}
                />
              );
            })}
          </div>
          <div className="p-4 rounded-lg">
            <button
              onClick={measureDownloadSpeed}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              ダウンロード速度を測定
            </button>
            {downloadJudgment !== null && (
              <p className="mt-2 text-lg font-bold text-custom-red">
                ダウンロード速度: {downloadJudgment.toFixed(2)} Mbps
              </p>
            )}
          </div>
        </div>
        {/*Wi-Fi速度・空席状況 グラフ*/}
        <div className="mt-16">
          <CafeStatusPieChart chartData={generateChartData(cafesArray)} />
        </div>
        <div className="flex pt-10 justify-center">
          <div className="px-10">
            <Button type="button" variant="secondary" onClick={onUpdate}>
              更新
            </Button>
          </div>
          <div className="px-16">
            <Button type="button" variant="danger" onClick={handleDelete}>
              削除
            </Button>
          </div>
        </div>
        <div className="text-center py-[100px]">
          <button
            className="text-[30px] px-16 py-5 rounded-2xl text-black ml-2 bg-custom-orange hover:bg-custom-green"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            top
          </button>
        </div>
      </div>
    </div>
  );
};
