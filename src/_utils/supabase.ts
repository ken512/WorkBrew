import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

// Supabaseクライアントを関数内で作成（環境変数がundefinedのまま評価されないように）
export const createSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase URL または Anon Key が未定義です。Vercelの環境変数を確認してください。");
  }

  return createClient(url, anonKey);
};

// 認証ユーザーを取得する共通関数
export const getCurrentUser = async (request: NextRequest) => {
  const supabase = createSupabaseClient(); // ← ここで生成

  const authHeader = request.headers.get("Authorization");
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      currentUser: null,
      error: {
        message: "Invalid authorization header format",
        status: 401,
      },
    };
  }

  const token = authHeader.split(" ")[1];

  try {
    const { data, error } = await supabase.auth.getUser(token);
    console.log("Supabase getUser Response:", { data, error });

    if (error) {
      return {
        currentUser: null,
        error: {
          message: error.message,
          status: 401,
        },
      };
    }

    return { currentUser: data, error: null };
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return {
      currentUser: null,
      error: {
        message: "Authentication failed",
        status: 401,
      },
    };
  }
};
