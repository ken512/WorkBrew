"use client";
import React from "react";
import { BarChart3 } from "lucide-react";
import Image from "next/image";
import "../../globals.css";

export const UsageSection: React.FC = () => {
  return (
    <section id="usage" className="py-16 bg-[#fefce8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          WorkBrewの使い方
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="bg-[#fefce8] rounded-xl p-4 mb-6">
              <Image
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952"
                alt="カフェでの作業"
                className="rounded-lg shadow-md"
                width={600}
                height={300}
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              カフェ情報の検索と投稿
            </h3>
            <p className="text-gray-600">
              エリアや条件で理想のカフェを検索。
              実際に訪れた感想や写真を投稿して、コミュニティに貢献できます。
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="bg-[#fefce8] rounded-xl p-4 mb-6 relative">
              <BarChart3 className="h-32 w-32 mx-auto text-[#d6b288]" />
              <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                Coming Soon
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">
              作業パフォーマンスの追跡
            </h3>
            <p className="text-gray-600">
              作業時間、タスクの完了状況、集中度をトラッキング。
              データに基づいて最適な作業環境を見つけられます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
