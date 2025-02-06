"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSupabaseSession } from "../../_hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import { MenuBar } from "../../_components/menuBar";
import { HeaderProps } from "../_types/headerProps";
import "../../globals.css";
import Link from "next/link";



export const HeaderAdminBase = ({ href }: HeaderProps) => {
  const { session, isLoading } = useSupabaseSession();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  if (isLoading) {
    // セッション情報が取得中の場合
    return (
      <header className="flex justify-center items-center p-4 bg-gray-100 ">
        <div className="text-gray-500">Loading...</div>
      </header>
    );
  }

  return (
    <header className="min-h-36 flex justify-between items-center px-[100px] font-bold bg-beige-200">
  <Link href={href} className="font-pacifico text-4xl hover:text-customOrange transition-colors duration-300">
    WorkBrew
  </Link>
  <div className="flex items-center space-x-40">
    <MenuBar />
    <div>
      {session ? (
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 px-4 py-2 rounded-lg"
        >
          ログアウト
        </button>
      ) : (
        <Link
          href="/login"
          className="text-white bg-blue-500 px-4 py-2 rounded-lg"
        >
          ログイン
        </Link>
      )}
    </div>
  </div>
</header>

  );
};
