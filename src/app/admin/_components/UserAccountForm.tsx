"use client";
import React, { useEffect } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { UserIcon } from "./userIcon";
import { UserAccountFormProps } from "../_types/userAccountForm";
import { Label } from "@/app/_components/label";
import { Input } from "@/app/_components/Input";
import { TextArea } from "@/app/_components/textArea";
import { UserAccountErrorType } from "../_types/userAccountErrorType";
import "./../../globals.css";
import {Button} from "@/app/admin/_components/Button";

type UserAccountFormPropsWithHandler = {
  formState: UserAccountFormProps;
  setFormState: React.Dispatch<React.SetStateAction<UserAccountFormProps>>;
  errors?: UserAccountErrorType;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onUpdate: (e: React.FormEvent) => Promise<void>;
};

export const UserAccountForm: React.FC<UserAccountFormPropsWithHandler> = ({
  formState, 
  setFormState, 
  errors,
  onSubmit,
  onUpdate
}) => {
  const {token} = useSupabaseSession();

  useEffect(() => {
    if(!token) return;
    
    const fetchData = async() => {
      try {
        const response = await fetch("/api/admin/user_account", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if(!response.ok) {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          throw new Error(errorData.message || "Failed to fetch user");
        }
        const data = await response.json();
        console.log("Fetched user data:", data);

        if (data.user) {
          console.log("Setting form state with:", data.user);
          setFormState({
            userName: data.user.userName || '',
            profileIcon: data.user.profileIcon || '',
            biography: data.user.biography || '',
          });
        }
      } catch(error) {
        console.log("Failed to fetch user", error);
      }
    };
    fetchData();
  }, [token, setFormState]);

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
    <div className="flex flex-col font-bold items-center py-60">
      <div className="self-start pl-[310px]">
        <Label htmlFor="profileIcon">
          ユーザーアイコン
        </Label>
        <UserIcon 
          onImageUpload={handleImageUpload} 
          initialImage={formState.profileIcon}
        />
      </div>
      <div className="my-10 w-[800px] py-5">
        <Label htmlFor="userName">
          ユーザー名
        </Label>
        {errors && (
          <p className="text-red-500 text-sm">{errors.userName}</p>
        )}
        <Input
          type="text"
          name="userName"
          id="userName"
          value={formState.userName}
          placeholder="ユーザー名"
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
      <div className="flex justify-center items-center pt-20">
      <div className="px-16">
        <Button
          type="button"
          variant="primary"
          onClick={onSubmit}
        >
          保存
        </Button>
        </div>
        <div className="px-16">
          <Button
            type="button"
            variant="secondary"
            onClick={onUpdate}
          >
            更新
          </Button>
        </div>
      </div>
    </div>
  );
};
