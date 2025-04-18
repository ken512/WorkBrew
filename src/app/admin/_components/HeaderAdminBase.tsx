"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSupabaseSession } from "../../_hooks/useSupabaseSession";
<<<<<<< HEAD
import { supabase } from "@/_utils/supabase";
import { MenuBarAdmin } from "./MenuBarAdmin";
import { HeaderProps } from "../_types/ueaderProps";
import "../../globals.css";
import Link from "next/link";

export const HeaderAdminBase = ({ href }: HeaderProps) => {
=======
import { supabase } from "@/utils/supabase";
import AdminMenu from "../AdminMenu";
import "../../globals.css";
import Link from "next/link";

type HeaderProps = {
  href: string;
  className: string;
  children: React.ReactNode;
};

export const HederAdminBase = ({ href, className, children }: HeaderProps) => {
>>>>>>> parent of bed149f (Merge pull request #3 from ken512/feature/user_account)
  const { session, isLoading } = useSupabaseSession();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

<<<<<<< HEAD
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
=======
  if (isLoading) {
    // セッション情報が取得中の場合
    return (
      <header className="flex justify-center items-center p-4 bg-gray-100">
        <div className="text-gray-500">Loading...</div>
      </header>
    );
  }

  return (
    <header className="min-h-36 flex justify-between items-center p-4  bg-beige-200">
      <div>
        <Link href={href} className={className}>
          {children}
>>>>>>> parent of bed149f (Merge pull request #3 from ken512/feature/user_account)
        </Link>
      </div>
      <div>
        <AdminMenu />
        </div>
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
    </header>
  );
};
