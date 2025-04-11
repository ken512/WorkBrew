"use client";
import { supabase } from "@/_utils/supabase";
import React,{ useState } from "react";
import { Input } from "../_components/Input";
import { Label } from "../_components/Label";
import { HeaderPublic } from "../_components/headerPublic";
import { Footer } from "../_components/footer";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data,error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      },
    });

    if (error) {
      alert("登録に失敗しました");
    } else {
      console.log(data)
      setEmail("");
      setPassword("");
      alert("確認メールを送信しました");
    }
  };

  return (
    <div>
        <HeaderPublic />
      <div className="bg-tan-300 min-h-screen flex flex-col items-center justify-center sm:px-5">
      <h1 className="text-3xl font-bold">ユーザー登録</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-[500px] ">
          <div className="py-5">
            <Label htmlFor="email">
              メールアドレス
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-5"
              required
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="6文字以上8文字以内"
              required
              minLength={6}         // 🔽 最小6文字
              maxLength={8}        // 🔽 最大30文字（任意）
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="py-5 flex justify-center">
            <button
              type="submit"
              className="w-[120px]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center"
            >
              登録
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
