"use client";
import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { HeaderBase } from "../_components/HeaderBase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      },
    });

    if (error) {
      alert("登録に失敗しました");
    } else {
      setEmail("");
      setPassword("");
      alert("確認メールを送信しました");
    }
  };

  return (
    <div>
      <HeaderBase />
      <div className=" min-h-screen bg-tan-300 flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-[500px] ">
          <div className="py-5">
            <label htmlFor="email" className="block md-2">
              メールアドレス
            </label>
            <input
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
            <label htmlFor="password" className="block md-2">
              パスワード
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-5"
              placeholder="••••••••"
              required
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
    </div>
  );
};

export default SignUp;
