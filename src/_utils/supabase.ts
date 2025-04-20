import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

console.log("Vercel環境 SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Vercel環境 SUPABASE_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/** APIリクエストのtokenの検証。検証できればログインユーザー（Supabase）情報を返す */
export const getCurrentUser = async(request: NextRequest) => {
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
    console.log("Supabase getUser Response:", { data, error });
    
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