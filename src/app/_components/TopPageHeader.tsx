"use client";
import React from 'react';
import { Button } from '../admin/_components/Button';
import "../globals.css";

export const TopPageHeader: React.FC = () => {
  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-[#d6b288]">WorkBrew</div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#about" className="text-gray-700 hover:text-[#d6b288]">WorkBrew</a>
          <a href="#features" className="text-gray-700 hover:text-[#d6b288]">特徴</a>
          <a href="#usage" className="text-gray-700 hover:text-[#d6b288]">使い方</a>
          <a href="/cafe_post" className="text-gray-700 hover:text-[#d6b288]">カフェ一覧</a>
          <Button type="button">
            ログイン
          </Button>
          <Button type="button">
            新規登録
          </Button>
        </div>
      </nav>
    </header>
  );
};