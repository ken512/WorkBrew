"use client";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-tan-300 text-white py-6 text-sm w-full px-4 sm:px-6 lg:px-10">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-between items-start mb-10">
          <a
            href="/home"
            className="text-5xl sm:text-3xl md:text-4xl mt-9 font-pacifico hover:text-custom-green"
          >
            WorkBrew
          </a>
          <div className="flex flex-col items-start space-y-1 text-xl font-bold sm:text-sm md:text-base">
            <a href="/faq" className="hover:text-custom-green">FAQ</a>
            <a href="/login" className="hover:text-custom-green">ログイン</a>
            <a href="/signup" className="hover:text-custom-green">サインアップ</a>
          </div>
        </div>

        <div className="border-t border-white w-full mb-2" />

        <div className="text-center text-lg font-bold flex items-center justify-center gap-5">
          <span>©</span>
          <span>2025 WorkBrew</span>
        </div>
      </div>
    </footer>
  );
};
