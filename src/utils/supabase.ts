import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

/** APIリクエストのtokenの検証。検証できればログインユーザー（Supabase）情報を返す */
export const getCurrentUser = async(request: NextRequest) => {
  const token = request.headers.get("Authorization")!
  console.log("Authorization Header:", token); // トークンの確認
  const {data, error} = await supabase.auth.getUser(token)
  console.log("Supabase getUser Response:", { data, error }); // Supabase のレスポンスを確認
  
  return {currentUser: data, error}
}