"use client";
import React from 'react';
import { Smartphone, Laptop } from 'lucide-react';
import "../../globals.css";

export const FeaturesSection:React.FC = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          WorkBrewの特徴
        </h2>
        <div className="grid sm:grid-cols-1 grid-cols-2 gap-12">
          <div className="text-center">
            <div className="relative">
              <div className="bg-[#fefce8] rounded-2xl p-6 mb-6">
                <Smartphone className="h-48 w-auto mx-auto text-[#d6b288]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-xl p-4 shadow-lg w-3/4">
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full" />
                          <div className="h-2 bg-gray-200 rounded flex-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">カフェ情報の集約と共有</h3>
            <p className="text-gray-600">
              お気に入りのカフェを見つけて、仲間と共有。
              Wi-Fi速度、電源状況など、作業に必要な情報をチェック。
            </p>
          </div>
          <div className="text-center">
            <div className="relative">
              <div className="bg-[#fefce8] rounded-2xl p-6 mb-6">
                <Laptop className="h-48 w-auto mx-auto text-[#d6b288]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
                    <p className="text-sm text-gray-600">※ 作業効率分析機能は現在準備中です</p>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">作業効率の記録と分析</h3>
            <p className="text-gray-600">
              作業時間や達成度を記録し、あなたの生産性を可視化。
              最適な作業環境を見つけましょう。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
