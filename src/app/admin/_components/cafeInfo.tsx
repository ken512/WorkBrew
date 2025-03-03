"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Cafe } from "@/app/_types/Cafe";
import { timeAgo } from "../utils/timeAgo";
import { RenderStars } from "../utils/renderStars";
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
      <h1 className="font-bold text-[min(13vw,30px)] text-center">最新情報</h1>

      {cafes.length === 1 ? (
        // 投稿が1件だけの場合はSwiperを使わずにカード表示
        <div
          className="mx-auto mt-[100px] max-w-[500px] max-h-[400px] bg-beige-200 rounded-lg shadow-md overflow-hidden"
          onClick={() => onClick(cafes[0])}//クリックされたカフェを渡す 
        >
          <div className="relative w-[300px] h-[200px]">
            <Image
              src={cafes[0].thumbnailImage}
              alt={cafes[0].cafeName}
              className=" w-full rounded-lg object-cover"
              fill
            />
          </div>
          <div className="p-5 h-[150px]">
            <h3 className="text-sm font-bold pt-2">{cafes[0].cafeName}</h3>
            <p className="text-sm font-bold pt-10">
              {timeAgo(cafes[0].createdAt || cafes[0].updatedAt)}
            </p>
          </div>
        </div>
      ) : (
        // 投稿が2件以上の場合はSwiperを使用
        <Swiper
          className="max-w-[800px] h-[400px] mx-auto py-10 mt-[100px]"
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={Math.min(2, cafes.length)} // cafes.length に応じてスライドの数を自動調整
          loop={true} //スライドをループさせる
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }} // スライド表示時間、2件以上の時のみ有効 
          navigation // ナビゲーション（左右の矢印）
          pagination={ { clickable: true }} // ページネーション, クリックで対象のスライドに切り替わる
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: Math.min(3, cafes.length), // cafes.length に応じて調整
              spaceBetween: 30,
            },
          }}
        >
          {cafes.map((cafe) => (
            <SwiperSlide key={cafe.id}>
              <div
                className="bg-beige-200 rounded-lg shadow-md overflow-hidden m-2"
                onClick={() => onClick(cafe)}//クリックされたカフェを渡す 
              >
                <div className="relative w-full h-[200px]">
                  <Image
                    src={cafe.thumbnailImage}
                    alt={cafe.cafeName}
                    className="rounded-lg object-cover"
                    fill
                  />
                </div>
                <div className="p-5 h-[200px]">
                  <h3 className="text-sm font-bold pt-2">{cafe.cafeName}</h3>
                  <p className="text-sm font-bold pt-10">
                    {timeAgo(cafe.createdAt || cafe.updatedAt)}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
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
      <h1 className="font-bold text-[min(13vw,30px)] text-center">
        おすすめのカフェ情報
      </h1>
      {cafes.length === 1 ? (
        <div
          className="mx-auto mt-[100px] max-w-[500px] max-h-[400px] bg-beige-200 rounded-lg shadow-md overflow-hidden"
          onClick={() => onClick(cafes[0])}//クリックされたカフェを渡す 
        >
          <div className="relative w-[300px] h-[200px]">
            <Image
              src={cafes[0].thumbnailImage}
              alt={cafes[0].cafeName}
              className=" w-full rounded-lg object-cover"
              fill
            />
          </div>
          <div className="p-5 h-[150px]">
            <h3 className="text-sm font-bold pt-2">{cafes[0].cafeName}</h3>
            <p className="text-sm font-bold pt-5">
              星評価: {RenderStars(cafes[0].starRating)}
            </p>
            <p className="text-sm font-bold pt-5">エリア {cafes[0].area}</p>
          </div>
        </div>
      ) : (
        <Swiper
          className="max-w-[800px] h-[450px] mx-auto py-10 mt-[100px]"
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={Math.min(2, cafes.length)}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation
          pagination={ { clickable: true }}
          breakpoints={{
            480: {
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
                className="bg-beige-200 rounded-lg shadow-md overflow-hidden m-2"
                onClick={() => onClick(cafe)}//クリックされたカフェを渡す 
              >
                <div className="relative w-full h-[200px]">
                  <Image
                    src={cafe.thumbnailImage}
                    alt={cafe.cafeName}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="p-5 h-[200px]">
                  <h3 className="text-sm font-bold pt-5">{cafe.cafeName}</h3>
                  <p className="text-sm font-bold pt-5">
                    星評価: {RenderStars(cafe.starRating)}
                  </p>
                  <p className="text-sm font-bold pt-5">エリア  {cafe.area}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
