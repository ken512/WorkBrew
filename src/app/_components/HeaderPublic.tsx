"use client";
import React from "react";
import { Button } from "./Button";
import { HeaderBase } from "./HeaderBase";

export const HeaderPublic: React.FC = () => {
  return (
    <header className="min-h-36 flex justify-between py-6  h-15 bg-beige-200">
      <div className="my-6 flex flex-row items-center">
        <HeaderBase href="#WorkBrewとは？" className="border-b-6 px-2">
          WorkBrewとは？
        </HeaderBase>
        <HeaderBase href="#WorkBrewの特徴" className="border-b-6 px-2">
          WorkBrewの特徴
        </HeaderBase>

        <HeaderBase href="#WorkBrewの使い方" className="border-b-6 px-2">
          WorkBrewの使い方
        </HeaderBase>
      </div>
      <div className="flex justify-between my-5">
        <Button
          href="/cafe_post"

          className="rounded-3xl bg-yellow-400 p-2 px-6 mx-6"
        >
          カフェ一覧
        </Button>
        <Button
          href="/login"
          className="rounded-3xl bg-yellow-400 p-2 px-6 mx-6"
        >
          ログイン
        </Button>
        <Button
          href="/signup"
          className="rounded-3xl bg-yellow-400 p-2 px-6 mx-6"
        >
          ユーザー登録
        </Button>
      </div>
    </header>
  );
};
