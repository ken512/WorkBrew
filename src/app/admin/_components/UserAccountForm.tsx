"use client";
import React, { useEffect } from "react";
import { UserIcon } from "./UserIcon";
import { UserAccountFormProps } from "../_types/userAccountForm";
import { Label } from "@/app/_components/Label";
import { TextArea } from "@/app/_components/TextArea";
import { UserAccountErrorType } from "../_types/userAccountErrorType";
import { Button } from "@/app/admin/_components/Button";
import useSWR from "swr";
import api from "@/_utils/api";
import "./../../globals.css";

//共通リクエストを使用する
const fetcher = (url: string) => api.get(url);

type UserAccountFormPropsWithHandler = {
  formState: UserAccountFormProps;
  setFormState: React.Dispatch<React.SetStateAction<UserAccountFormProps>>;
  errors?: UserAccountErrorType;
  onSubmit: (e: React.FormEvent) => void;
  onUpdate: (e: React.FormEvent) => void;
};

export const UserAccountForm: React.FC<UserAccountFormPropsWithHandler> = ({
  formState,
  setFormState,
  errors,
  onSubmit,
  onUpdate,
}) => {
  // 画像がない場合、デフォルト画像をセット
  const defaultIcon = "https://placehold.jp/600x350/?text=デフォルト";
  const { data, error } = useSWR("/api/admin/user_account", fetcher);
  
  useEffect(() => {
    if (data?.user) {
      setFormState({
        userName: data.user.userName || "",
        profileIcon: data.user.profileIcon || defaultIcon,
        biography: data.user.biography || "",
      });
    }
  }, [data, setFormState]);

  if (error) return <p>ユーザー情報の取得に失敗しました</p>;

  // 状態を更新するための関数
  const updateFormState = (key: keyof UserAccountFormProps, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormState(name as keyof UserAccountFormProps, value);
  };

  const handleImageUpload = (imageUrl: string) => {
    updateFormState("profileIcon", imageUrl);
  };

  return (
    <div className="bg-tan-300 min-h-screen flex flex-col grid-flow-row items-center justify-center sm:mx-5 md:mx-16">
      <h1 className="flex justify-center font-bold text-3xl mt-[200px]">
        ユーザーアカウント
      </h1>
      <div className="w-full flex flex-col items-center my-16 sm:my-10">
        <Label htmlFor="profileIcon">ユーザーアイコン</Label>
        <UserIcon
          onImageUpload={handleImageUpload}
          initialImage={formState.profileIcon}
        />
      </div>

      <div className="py-10 w-full max-w-[700px] sm:max-w-[350px] md:max-w-[650px] px-4">
        <Label htmlFor="userName">ユーザー名</Label>
        {errors && <p className="text-red-500 text-sm">{errors.userName}</p>}
        <input
          type="text"
          name="userName"
          id="userName"
          maxLength={15}
          value={formState.userName}
          placeholder="ユーザー名・15文字以内"
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-5"
        />
      </div>
      <div>
        <TextArea
          label="自己紹介"
          placeholder="200文字以内"
          value={formState.biography}
          maxLength={200}
          name="biography"
          onChange={(e) => updateFormState("biography", e.target.value)}
          rows={15}
          col={80}
        />
      </div>
      <div className="flex justify-center items-center pt-20 mb-16">
        <div className="px-16 sm:px-3">
          <Button type="button" variant="primary" onClick={onSubmit}>
            保存
          </Button>
        </div>
        <div className="px-16 sm:px-3">
          <Button type="button" variant="secondary" onClick={onUpdate}>
            更新
          </Button>
        </div>
      </div>
    </div>
  );
};
