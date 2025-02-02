"use client";
import React from "react";
import { Button } from "@/app/admin/_components/Button";
import "../../globals.css";

  type PostClearButtonProps = {
    ClickPost: (e: React.FormEvent) => void;
    ClickClear: () => void;
  }

export const PostClearButton: React.FC<PostClearButtonProps> = ({ClickPost, ClickClear}) => {
  return (
    <div className="py-10 my-[100px] font-bold flex justify-center text-black">
      {/* 投稿ボタン */}
      <div
      className="cursor-pointer mx-16"
      onClick={(e) => {e.preventDefault(); ClickPost(e)}}
      >
    <Button type="button" className="py-3 px-16 bg-custom-blue rounded-3xl font-bold hover:bg-custom-green">
      投稿
    </Button>
    </div>
    {/* クリアボタン */}
    <div
      className="cursor-pointer mx-16"
      onClick={() => {
        ClickClear();
      }}
    >
    <Button type="button" className=" py-3 px-16 bg-beige-200 rounded-3xl font-bold hover:bg-custom-green">
      クリア
    </Button>
    </div>
    </div>
  );
};
