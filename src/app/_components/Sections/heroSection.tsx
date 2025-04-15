"use client";
import React from 'react';
import Image from 'next/image';
import "../../globals.css";
import { GuestLoginButton } from '../guestLoginButton';
export const HeroSection:React.FC = () => {
  return (
    <section id="about" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-1 grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="ノートとコーヒー"
              className="rounded-lg shadow-xl w-full h-auto"
              width={800}
              height={600}
            />
          </div>
          <div className="sm:order-1 order-2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-[#d6b288] mb-6">
              WorkBrew
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              ユーザーがカフェ情報共有・探索し、作業効率を記録・分析できる便利なプラットフォーム
            </p>
            <button className="bg-[#d6b288] text-white px-6 py-2 mx-10 rounded-full text-lg font-bold hover:bg-[#c4a176] transform transition hover:scale-105">
              <a href="/signup">今すぐ始める</a>
            </button>
            <div className="mt-10">
            <GuestLoginButton/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};