"use client";
import React from "react";
import { LinkButton } from "./linkButton";
import { HeaderBase } from "./headerBase";

export const TopPageHeader: React.FC = () => {
  return (
    <header className="min-h-36 flex justify-between py-6  h-15 bg-beige-200">
      <div className="my-6 flex flex-row items-center">
        <HeaderBase href="#WorkBrewとは？">
          WorkBrewとは？
        </HeaderBase>
        <HeaderBase href="#WorkBrewの特徴">
          WorkBrewの特徴
        </HeaderBase>

        <HeaderBase href="#WorkBrewの使い方">
          WorkBrewの使い方
        </HeaderBase>
      </div>
      <div className="flex justify-between my-5">
        <LinkButton
          href="/cafe_post"
          type="button"
        >
          カフェ一覧
        </LinkButton>
        <LinkButton
          href="/login"
          type="button"
        >
          ログイン
        </LinkButton>
        <LinkButton 
          href="/signup"
          type="button"
        >
          ユーザー登録
        </LinkButton>
      </div>
    </header>
  );
};
