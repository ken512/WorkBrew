"use client";
//Supabase対応で、非同期tokenも取得できる共通リクエスト関数
import { supabase } from "@/_utils/supabase";
//HeadersInit（標準のヘッダー型）と Authorization?: string（追加の認証token用）
type HeadersWithAuth = HeadersInit & { Authorization?: string };

const api = {
  //requestにまとめてメソッドを共通にする
  request: async <T>(method: string, endpoint: string, body?: T) => {
    const baseUrl = 'http://localhost:3000';

    const headers: HeadersWithAuth = {
      'Content-Type': 'application/json',
    };

    // Supabaseからtoken取得( tokenをファイル内で取得して、呼び出し元でtokenを渡さずに済む)
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;//tokenがあった時だけ付
    }

    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, options);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `${method} リクエスト失敗`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  //それぞれのメソッドに、request関数を呼び出す
  get: (endpoint: string) => api.request('GET', endpoint),//GETのみSWRで取得するため、bodyは不要(endpointのみ)
  post: <T>(endpoint: string, body: T) => api.request('POST', endpoint, body),
  put: <T>(endpoint: string, body: T) => api.request('PUT', endpoint, body),
  delete: <T>(endpoint: string, body: T) => api.request('DELETE', endpoint, body),
};

export default api;
