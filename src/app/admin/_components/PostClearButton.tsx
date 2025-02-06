"use client";
import React from "react";
import { Button } from "@/app/admin/_components/Button";
import "../../globals.css";

type PostClearButtonProps = {
  onPost: (e: React.FormEvent) => void;
  onClear: () => void;
};

export const PostClearButton: React.FC<PostClearButtonProps> = ({
  onPost,
  onClear
}) => {
  return (
    <div className="py-10 my-[100px] font-bold flex justify-center text-black">
      {/* 投稿ボタン */}
      <div
      className="cursor-pointer mx-16"
      onClick={(e) => {e.preventDefault(); onPost(e)}}
      >
    <Button type="button">
      投稿
    </Button>
    </div>
    {/* クリアボタン */}
    <div
      className="cursor-pointer mx-16"
      onClick={() => {
        onClear();
      }}
    >
    <Button type="button">
      クリア
    </Button>
    </div>
    </div>
  );
};
