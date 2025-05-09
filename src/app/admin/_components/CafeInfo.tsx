"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Cafe } from "@/app/_types/Cafe";
import { timeAgo } from "../_utils/timeAgo";
import { RenderStars } from "../_utils/renderStars";
import "../../globals.css";

// Swiper のスタイルをインポート
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
  cafes: Cafe[];
  onClick: (cafes: Cafe) => void;
};

// 最新カフェ投稿の表示
export const LatestCafeList: React.FC<Props> = ({ cafes, onClick }) => {
  if(cafes.length === 0) {
    return <p className="mb-[100px] text-[min(13vw,25px)] font-bold text-custom-red">最新情報の投稿がありません</p>
  }
  return (
    <div className="mt-[100px]">
      <h1 className="font-bold text-[min(13vw,30px)] sm:text-lg text-center">最新情報</h1>
        <Swiper
        className={`mx-auto py-10 mt-[100px]  rounded-lg shadow-md overflow-hidden ${
          cafes.length === 1 ? "max-w-[300px] h-[400px]" : "max-w-[800px] h-[400px] sm:max-w-[300px] sm:h-[400px] md:max-w-[600px] md:max-h-[500px]"
        }`}
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={Math.min(3, cafes.length)}
        loop={cafes.length > 1} // スライドが2つ以上のときのみループ
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={cafes.length > 1} // 2つ以上のスライドがある場合のみナビゲーションを有効化
        pagination={cafes.length > 1 ? { clickable: true } : false} // 2つ以上のスライドがある場合のみページネーションを有効化
        watchOverflow={true} // スライドが1枚のときSwiperのレイアウト崩れを防ぐ
        breakpoints={{
          360: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: Math.min(3, cafes.length),
            spaceBetween: 30,
          },
        }}
      >
        {cafes.map((cafe) => (
          <SwiperSlide key={cafe.id}>
            <div
              className="bg-beige-200 rounded-lg shadow-md overflow-hidden"
              onClick={() => onClick(cafe)}
            >
              <div className="relative w-full h-[200px]">
                <Image
                  src={cafe.thumbnailImage}
                  alt="thumbnailImage"
                  className="rounded-lg object-cover"
                  fill
                />
              </div>
              <div className="p-5 h-[200px]">
                <h3 className="text-sm font-bold pt-2 truncate max-w-[250px] whitespace-nowrap overflow-hidden">{cafe.cafeName}</h3>
                <p className="text-sm font-bold pt-28">
                  {timeAgo(cafe.createdAt && cafe.updatedAt)}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

//おすすめカフェの表示
export const RecommendationCafeList: React.FC<Props> = ({ cafes, onClick }) => {
  if(cafes.length === 0) {
    return <p className="mt-[100px] text-[min(13vw,25px)] font-bold text-custom-red">おすすめカフェ情報の投稿がありません</p>
  }
  return (
    <div className="mt-[200px] mb-[130px]">
      <h1 className="font-bold text-[min(13vw,30px)] sm:text-lg text-center">
        おすすめのカフェ情報
      </h1>
        <Swiper
            className={`mx-auto py-10 mt-[100px] rounded-lg shadow-md overflow-hidden ${
              cafes.length === 1
                ? "max-w-[300px] h-auto" // ← 修正点
                : "max-w-[800px] h-[400px] sm:max-w-[300px] sm:h-[400px] md:max-w-[600px] md:max-h-[500px]"
            }`}
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={Math.min(3, cafes.length)}
          loop={cafes.length > 1} // スライドが2つ以上のときのみループ
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={cafes.length > 1} // 2つ以上のスライドがある場合のみナビゲーションを有効化
          pagination={cafes.length > 1 ? { clickable: true } : false} // 2つ以上のスライドがある場合のみページネーションを有効化
          watchOverflow={true} // スライドが1枚のときSwiperのレイアウト崩れを防ぐ
          breakpoints={{
            360: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: Math.min(3, cafes.length),
              spaceBetween: 20,
            },
          }}
        >
          {cafes.map((cafe) => (
            <SwiperSlide key={cafe.id}>
              <div
                className="bg-beige-200 rounded-lg shadow-md overflow-hidden"
                onClick={() => onClick(cafe)}//クリックされたカフェを渡す 
              >
                <div className="relative w-full h-[200px]">
                  <Image
                    src={cafe.thumbnailImage}
                    alt="thumbnailImag"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="p-5 h-[200px]">
                  <h3 className="text-sm font-bold pt-5 truncate max-w-[250px] whitespace-nowrap overflow-hidden">{cafe.cafeName}</h3>
                  <p className="text-sm font-bold pt-5">
                    星評価: {RenderStars(cafe.starRating)}
                  </p>
                  <p className="text-sm font-bold pt-5">エリア  {cafe.area}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  );
};