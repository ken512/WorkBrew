"use client";
import React from "react";
<<<<<<< HEAD
import { HeaderBase } from "./HeaderBase";
import { MenuBarPublic } from "./MenuBarPublic";
import "../globals.css"
export const HeaderPublic: React.FC = () => {
  return (
    <div className="min-h-36 sm:min-h-20 flex justify-between items-center px-[100px] sm:px-[10px]  font-bold bg-beige-200">
      <HeaderBase
        href="/"
      >
        WorkBrew
      </HeaderBase>
      <div className="flex items-center space-x-40 sm:space-x-10">
      <MenuBarPublic />
=======
import { LinkButton } from "./LinkButton";
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
>>>>>>> parent of bed149f (Merge pull request #3 from ken512/feature/user_account)
      </div>
      <div className="flex justify-between my-5">
        <LinkButton
          href="/cafe_post"

          className="rounded-3xl bg-yellow-400 p-2 px-6 mx-6"
        >
          カフェ一覧
        </LinkButton>
        <LinkButton
          href="/login"
          className="rounded-3xl bg-yellow-400 p-2 px-6 mx-6"
        >
          ログイン
        </LinkButton>
        <LinkButton
          href="/signup"
          className="rounded-3xl bg-yellow-400 p-2 px-6 mx-6"
        >
          ユーザー登録
        </LinkButton>
      </div>
    </header>
  );
};
