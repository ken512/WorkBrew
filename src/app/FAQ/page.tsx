"use client";
import React from "react";
import { HeaderPublic } from "../_components/headerPublic";
import { Footer } from "../_components/footer";
import Image from "next/image";
const FAQ: React.FC = () => {
  return (
    <div>
      <HeaderPublic />
      <div className="bg-tan-300 min-h-screen flex flex-col items-center px-4 py-20 sm:px-2">
        <h1 className="text-3xl font-bold text-center mb-10">よくある質問</h1>

        {/* FAQ画像 */}
        <Image
          src="/images/22395877-removebg-preview.png"
          alt="FAQ"
          width={670}
          height={370}
          className="w-[300px] md:w-[300px] lg:w-[400px] xl:w-[500px] h-auto mb-16 bg-tan-300"
        />

        {/* Q1 */}
        <div className="w-full max-w-3xl mb-10 font-bold sm:max-w-[350px] sm:text-sm">
          <div className="flex items-start mb-10">
            <span className="bg-blue-500 text-white font-bold rounded-full w-6 h-6 min-w-[1.5rem] flex items-center justify-center mr-2">
              Q
            </span>
            <p className="text-lg font-semibold">
              WorkBrewってどんなアプリ？ 他のカフェサイトと何が違うの？
            </p>
          </div>
          <div className="flex items-start">
            <span className="bg-red-400  text-white font-bold rounded-full w-6 h-6 min-w-[1.5rem] flex items-center justify-center mr-2">
              A
            </span>
            <p className="text-lg sm:text-sm">
              WorkBrewは、カフェで作業したい人のための投稿共有アプリです。
              <br />
              Wi-Fi速度や空席状況といった「作業に役立つリアルな情報」をユーザー同士で投稿・共有できます。
              <br />
              ただのレビューではなく、作業環境に特化した情報が可視化されているのが特徴です。
            </p>
          </div>
          <div className="border-b border-black my-16" />

          {/* Q2 */}
          <div className="flex items-start mb-10">
            <span className="bg-blue-500 text-white font-bold rounded-full w-6 h-6 min-w-[1.5rem] flex items-center justify-center mr-2">
              Q
            </span>
            <p className="text-lg font-semibold">アカウント作成するには？</p>
          </div>
          <div className="flex items-start">
            <span className="bg-red-400 text-white font-bold rounded-full w-6 h-6 min-w-[1.5rem] flex items-center justify-center mr-2">
              A
            </span>
            <p className="text-lg sm:text-sm">
              「サインアップ」ボタンをクリックし、必要な情報を入力するだけで完了します。
            </p>
          </div>
          <div className="border-b border-black my-16" />

          {/* Q3 */}
          <div className="flex items-start mb-10">
            <span className="bg-blue-500 text-white font-bold rounded-full w-6 h-6 min-w-[1.5rem] flex items-center justify-center mr-2">
              Q
            </span>
            <p className="text-lg font-semibold">
              ログインしなくても投稿は見れますか？
            </p>
          </div>
          <div className="flex items-start">
            <span className="bg-red-400 text-white font-bold rounded-full w-6 h-6 min-w-[1.5rem] flex items-center justify-center mr-2">
              A
            </span>
            <p className="text-lg sm:text-sm">
              はい、投稿一覧ページはログインしていない状態でも閲覧可能です。
              <br />
              ただし、お気に入り登録や投稿機能等はログインが必要となります。
            </p>
          </div>
          <div className="border-b border-black my-16" />
          {/* Q4 */}
          <div className="flex items-start mb-10">
            <span className="bg-blue-500 text-white font-bold rounded-full w-6 h-6 min-w-[1.5rem] flex items-center justify-center mr-2">
              Q
            </span>
            <p className="text-lg font-semibold">
            カフェを投稿するにはどうしたらいい？
            </p>
          </div>
          <div className="flex items-start">
            <span className="bg-red-400 text-white font-bold rounded-full w-6 h-6 min-w-[1.5rem] flex items-center justify-center mr-2">
              A
            </span>
            <p className="text-lg sm:text-sm">
            カフェを投稿するには、**ユーザーアカウントの登録（無料）**が必要です。
              <br />
              登録後、カフェの写真やWi-Fi速度、空席状況などを入力して投稿できます。
              <br />
              他のユーザーの役に立つ情報をシェアして、作業にぴったりなカフェの輪を広げましょう！
            </p>
          </div>
          <div className="border-b border-black my-16" />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default FAQ;
