"use client";
<<<<<<< HEAD
import { supabase } from "@/_utils/supabase";
import React,{ useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../_components/Input";
import { Label } from "../_components/Label";
import { HeaderPublic } from "../_components/HeaderPublic";
import { FooterDefault } from "../_components/Footer/FooterDefault";
import { Button } from "../admin/_components/Button";
=======
import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../_components/Input";
import { Label } from "../_components/Label";
import { HederAdminBase } from "../admin/_components/HeaderAdminBase";
import { Button } from "../_components/Button";
>>>>>>> parent of bed149f (Merge pull request #3 from ken512/feature/user_account)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("ログイン失敗しました。詳細: " + error.message);
    } else {
<<<<<<< HEAD
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
=======
      alert("ログインに成功しました");
      router.replace("/admin/home");
>>>>>>> parent of bed149f (Merge pull request #3 from ken512/feature/user_account)
    }
  };

  return (
    <div>
<<<<<<< HEAD
      <HeaderPublic />
      <div className="min-h-screen bg-tan-300 flex flex-col items-center justify-center sm:px-5">
        <h1 className="text-3xl font-bold">ログイン</h1>
=======
      <HederAdminBase href="/" className="py-12">
        WorkBrew
      </HederAdminBase>
      <div className="min-h-screen bg-tan-300 flex flex-col items-center justify-center">
        <h1 className="text-5xl">ログイン</h1>
>>>>>>> parent of bed149f (Merge pull request #3 from ken512/feature/user_account)
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
<<<<<<< HEAD
              placeholder="6文字以上10文字以内"
              minLength={6}         // 🔽 最小6文字
              maxLength={10}        // 🔽 最大10文字
=======
              placeholder="••••••••"
              required
>>>>>>> parent of bed149f (Merge pull request #3 from ken512/feature/user_account)
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
