"use client";
import React from "react";
import Link from "next/link";
import "../globals.css";

export const ButtonTop: React.FC = () => {
  return (
    <button className="flex justify-between my-5">
      <div className="rounded-3xl bg-beige-200 bg-yellow-400 p-2 px-6 mx-6">
        <Link href="/cafe_post">カフェ一覧</Link>
      </div>
      <div className="rounded-3xl bg-beige-200 bg-yellow-400 p-2 px-6 mx-6">
        <Link href="/login">
          <i className=""></i>ログイン
        </Link>
      </div>
      <div className="rounded-3xl bg-beige-200 bg-yellow-400 p-2 px-6 mx-6">
        <Link href="/signup">
          <i className=""></i> ユーザー登録
        </Link>
      </div>
    </button>
  );
};
