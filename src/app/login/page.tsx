"use client";
import { supabase } from "@/utils/supabase";
import React,{ useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../_components/Input";
import { Label } from "../_components/label";
import { HeaderAdminBase } from "../admin/_components/headerAdminBase";
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
      alert("ログインに成功しました");
      router.replace("/admin/home");
    }
  };

  return (
    <div>
      <HeaderAdminBase href="/" />
      <div className="min-h-screen bg-tan-300 flex flex-col items-center justify-center">
        <h1 className="text-5xl">ログイン</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-[500px]">
          <div className="py-5">
            <Label htmlFor="email" className="block md-2">
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
            <Label htmlFor="password" className="block md-2">
              パスワード
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-5"
              placeholder="••••••••"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <div className="py-5 flex justify-center">
            <Button
              type="submit"
              className="w-[120px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center"
            >
              ログイン
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
