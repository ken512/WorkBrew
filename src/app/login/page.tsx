"use client";
import { supabase } from "@/_utils/supabase";
import React,{ useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../_components/Input";
import { Label } from "../_components/Label";
import { HeaderPublic } from "../_components/HeaderPublic";
import { FooterDefault } from "../_components/Footer/FooterDefault";
import { Button } from "../admin/_components/Button";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data,error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("ログイン失敗しました。詳細: " + error.message);
    } else {
      console.log("Login successful, session data:", data);

      // セッションが取得できているか確認
      const sessionCheck = await supabase.auth.getSession();
      if (sessionCheck.data.session) {
        alert("ログインに成功しました");
        router.replace("/admin/home");
      } else {
        console.error("セッションが取得できませんでした");
        alert("セッションが取得できませんでした。");
      }
      ;
    }
  };

  return (
    <div>
      <HeaderPublic />
      <div className="min-h-screen bg-tan-300 flex flex-col items-center justify-center sm:px-5">
        <h1 className="text-3xl font-bold">ログイン</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-[500px]">
          <div className="py-5">
            <Label htmlFor="email">
              メールアドレス
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-5"
              placeholder="name@company.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="py-5">
            <Label htmlFor="password">
              パスワード
            </Label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-5"
              placeholder="6文字以上10文字以内"
              minLength={6}         //最小6文字
              maxLength={20}        //20文字以内
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <div className="py-5 flex justify-center">
          <Button
              type="submit"
            >
              ログイン
            </Button>
          </div>
        </form>
      </div>
      <FooterDefault  />
    </div>
  );
};

export default Login;