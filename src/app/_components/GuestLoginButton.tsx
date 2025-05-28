"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/_utils/supabase";
import { Button } from "../admin/_components/Button";
import toast, { Toaster } from "react-hot-toast";
import "../globals.css";

export const GuestLoginButton: React.FC = () => {
  const router = useRouter();
  const handleGuestLogin = async () => {
    //ゲスト用アカウントでログイン
    const {error} = await supabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_GUEST_EMAIL!,
      password: process.env.NEXT_PUBLIC_GUEST_PASSWORD!,
    });

    //エラー処理
    if (error) {
      console.error("ゲストログイン失敗:", error.message);
      toast.error("ゲストログインに失敗しました");
      return;
    };
  
    //セッション確認
    const {data: {session}, error: sessionError} = await supabase.auth.getSession();
    if(sessionError || !session) {
      console.error("セッション取得失敗: ",sessionError?.message);
      toast.error("セッション取得に失敗しました！");
      return;
    };
    toast.success("ゲストとしてログインしました");
    router.push("/admin/home"); 
    console.log("セッション", session.user.email);
  };

  return (
    <div>
    <Button type="button" variant="secondary" onClick={handleGuestLogin}>
      ゲストログイン
    </Button>
    <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};