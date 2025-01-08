"use client";
import React, { useEffect, useState } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { HederAdminBase } from "@/app/admin/_components/HeaderAdminBase";
"../../globals.css"
const Home: React.FC = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useSupabaseSession();

  console.log("Token:", token);
  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      try {
        const res = await fetch("/api/admin/home", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("データの取得に失敗しました。");
      }
    };

    fetcher();
  }, [token]);

  return (
    <div>
      <HederAdminBase  href="/admin/home" className="">
        WorkBrew
      </HederAdminBase>
      <div className="bg-tan-300 min-h-screen flex flex-col items-center justify-center">
        <h1>最新情報</h1>
        <h1>おすすめのカフェ情報</h1>
        {error && <p>{error}</p>} {/* エラーメッセージを表示 */}
        {data && (
          <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;