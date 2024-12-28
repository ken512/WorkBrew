"use client";
import React from "react";
import Link from "next/link";
// import { supabase } from "@/utils/supabase";
import { ButtonTop } from "./ButtonTop";

export const HeaderTop: React.FC = () => {
  return (
    <header className="min-h-36 flex justify-between py-6 px- h-15 bg-beige-200">
      <div className="my-6">
        <Link href="#WorkBrewとは？" className="border-b-6 px-10">
          WorkBrewとは？
        </Link>
        <Link href="#WorkBrewの特徴" className="border-b-6 px-10">
          WorkBrewの特徴
        </Link>

        <Link href="#WorkBrewの使い方" className="border-b-6 px-10">
          WorkBrewの使い方
        </Link>
      </div>
      <ButtonTop />
    </header>
  );
};
