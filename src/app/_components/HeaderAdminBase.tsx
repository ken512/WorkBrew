"use client";

import React from "react";
import Link from "next/link";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import AdminMenu from "../admin/AdminMenu";
import "../globals.css";

type HeaderProps = {
  href: string;
  className: string;
  children: React.ReactNode;
};

export const HederAdminBase = ({ href, className, children }: HeaderProps) => {
  const { session, isLoading } = useSupabaseSession();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

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
