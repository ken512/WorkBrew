"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSupabaseSession } from "../../_hooks/useSupabaseSession";
import { supabase } from "@/_utils/supabase";
import { MenuBarAdmin } from "./menuBarAdmin";
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

   // ローディング中の表示
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg font-semibold">
            ☕️ コーヒーを淹れています... お待ちください
          </p>
        </div>
      );
    }

  return (
    <header className="min-h-36 sm:min-h-20 flex justify-between items-center px-[100px] sm:px-[10px] md:px-[20px] font-bold bg-beige-200">
  <Link href={href} className="font-pacifico text-4xl sm:text-lg hover:text-customOrange transition-colors duration-300">
    WorkBrew
  </Link>
  <div className="flex items-center space-x-40 sm:space-x-10 md:space-x-10">
    <MenuBarAdmin />
    <div>
      {session ? (
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 px-4 py-2 sm:px-2 sm:py-1 rounded-lg sm:text-sm"
        >
          ログアウト
        </button>
      ) : (
        <Link
          href="/login"
          className="text-white bg-blue-500 px-4 py-2 sm:px-2 sm:py-1 rounded-lg sm:text-sm"
        >
          ログイン
        </Link>
      )}
    </div>
  </div>
</header>

  );
};
