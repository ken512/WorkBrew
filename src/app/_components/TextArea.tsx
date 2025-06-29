"use client";
import React from "react";
import "../globals.css";

type TextareaProps = {
  label?: string;
  placeholder?: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
  maxLength: number;
  rows: number;
  col: number;
  children?: React.ReactNode;
};

export const TextArea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  value,
  name,
  onChange,
  maxLength,
  rows = 7,
  col = 10,
  children,
}) => {
  return (
    <div>
      <label className="block mb-5 font-bold text-black text-xl sm:text-sm">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        cols={col}
        className="w-full p-4 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none sm:text-xs sm:p-3"
      >{children}</textarea>
    </div>
  );
};
