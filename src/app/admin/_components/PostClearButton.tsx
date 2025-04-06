"use client";
import React from "react";
import { Button } from "@/app/admin/_components/Button";
import "../../globals.css";

type PostClearButtonProps = {
  onClear: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  starRating: number;
};

export const PostClearButton: React.FC<PostClearButtonProps> = ({
  onClear,
  onSubmit,
  isSubmitting = false,
  starRating,

}) => {
  return (
    <div className="py-10 my-[100px] font-bold flex justify-center text-black">
      {/* 投稿ボタン */}
      <div className="cursor-pointer mx-16 sm:mx-5 sm:text-sm">
        <Button 
          type="submit"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "投稿中..." : "投稿"}
        </Button>
      </div>
      {/* クリアボタン */}
      <div className="cursor-pointer mx-16 sm:mx-5 sm:text-sm">
        <Button 
          type="button"
          onClick={onClear}
          disabled = {starRating === 0}
        >
          クリア
        </Button>
      </div>
    </div>
  );
};
