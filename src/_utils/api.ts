"use client";
const api = {
  put: async (endpoint: string, body: any, token?: string | null) => {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const baseUrl = 'http://localhost:3000'
    if(token) {
      headers['Authorization'] = `Bearer ${token}`
      console.log("送信するヘッダー:", headers);
    }
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
      });      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "更新失敗");
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },
  post: async (endpoint: string, body: any, token?: string | null) => {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const baseUrl = 'http://localhost:3000'
    if(token) {
      headers['Authorization'] = `Bearer ${token}`
      console.log("送信するヘッダー:", headers);
    }
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "作成失敗");
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },
  delete: async (endpoint: string, body: any, token?: string | null) => {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const baseUrl = 'http://localhost:3000'
    if(token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "削除失敗");
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },
};
export default api;
