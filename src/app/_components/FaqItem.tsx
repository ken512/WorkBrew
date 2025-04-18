"use client";
import React from "react";
import "../globals.css";

type FaqItemProps = {
  question: string;
  answer: string;
};

export const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  return (
    <div className="mb-10 font-bold sm:text-sm w-full max-w-3xl sm:max-w-[350px]">
      <div className="flex items-start mb-6">
        <span className="bg-blue-500 text-white font-bold rounded-full w-6 h-6 min-w-[1.5rem] flex items-center justify-center mr-2">
          Q
        </span>
        <p className="text-lg font-semibold">{question}</p>
      </div>
      <div className="flex items-start">
        <span className="bg-red-400 text-white font-bold rounded-full w-6 h-6 min-w-[1.5rem] flex items-center justify-center mr-2">
          A
        </span>
        <p className="text-lg sm:text-sm">{answer}</p>
      </div>
      <div className="border-b border-black my-16" />
      
    </div>
  );
};
