"use client";
import { createSupabaseClient } from "@/_utils/supabase";
import api from "@/_utils/api";
import useSWR from "swr";

  // カスタムfetcher関数：ログイン済みのときだけfetch、未ログインならnull返す
  const loginSafeFetcher = async (url: string) => {
  const supabase = createSupabaseClient();
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;

  if (!token) return null; // 未ログインなら取得しない

  return await api.get(url);
};

export const useLoginSafeFetcher = (url: string ) => {
  return useSWR(url, loginSafeFetcher);
}