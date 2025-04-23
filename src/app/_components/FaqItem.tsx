"use client";
import React from "react";
import "../globals.css";

type FaqItemProps = {
  question: string;
  answer: string;
};

export const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  return (
    <div className="mb-16  w-full max-w-3xl sm:max-w-[350px] text-black">
      {/* Q */}
      <div className="flex items-start gap-3 mb-4">
        <span className="bg-blue-500 text-white font-bold rounded-full w-6 h-6 min-w-[1.5rem] flex items-center justify-center mr-2">
          Q
        </span>
        <p className="text-lg font-bold leading-snug">{question}</p>
      </div>

      {/* A */}
      <div className="flex items-start gap-3">
        <span className="bg-red-400 text-white font-bold rounded-full w-6 h-6 min-w-[1.5rem] flex items-center justify-center mr-2">
          A
        </span>
        <div className="text-sm font-normal whitespace-pre-line leading-relaxed" dangerouslySetInnerHTML={{ __html: answer }}/>
      </div>

      {/* 区切り線 */}
      <div className="border-b border-gray-400 mt-8" />
    </div>
  );
};
