import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export const createSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase URL または Anon Key が未定義です。Vercelの環境変数を確認してください。");
  }

  return createClient(url, anonKey);
};
/** APIリクエストのtokenの検証。検証できればログインユーザー（Supabase）情報を返す */
export const getCurrentUser = async(request: NextRequest) => {
  const supabase = createSupabaseClient(); // ← 関数内で生成
  const authHeader = request.headers.get("Authorization");
  console.log("Authorization Header:", authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { 
      currentUser: null, 
      error: { 
        message: "Invalid authorization header format",
        status: 401 
      } 
    };
  }

  // "Bearer "を除去してトークンを取得
  const token = authHeader.split(' ')[1];
  
  try {
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error) {
      return { 
        currentUser: null, 
        error: { 
          message: error.message,
          status: 401 
        } 
      };
    }

    return { currentUser: data, error: null };
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return { 
      currentUser: null, 
      error: { 
        message: "Authentication failed",
        status: 401 
      } 
    };
  }
}