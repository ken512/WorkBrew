"use client";
import React, { useEffect } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
// import { UserIcon } from "./UserIcon";
import { UserAccountFormProps } from "../_types/UserAccountForm";
import { Label } from "@/app/_components/Label";
import { Input } from "@/app/_components/Input";
import { TextArea } from "@/app/_components/TextArea";
import { UserAccountErrorType } from "../_types/UserAccountErrorType";
import "./../../globals.css";

type UserAccountFormPropsWithHandler = {
  formState: UserAccountFormProps;
  setFormState: React.Dispatch<React.SetStateAction<UserAccountFormProps>>;
  errors?: UserAccountErrorType;
};
export const UserAccountForm: React.FC<UserAccountFormPropsWithHandler> = ({formState, setFormState, errors}) => {
  const {token} = useSupabaseSession();


  useEffect(() => {
    if(!token) return;
    
    const fetchData = async() => {
      try {
        const response = await fetch("/api/admin/user_account" , {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },

        });
        if(!response.ok) {
          throw new Error("Failed to fetch user");
        }
      } catch(error) {
        console.log("Failed to fetch user", error);
      }
    };
    fetchData();
  }, [token]);


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

  return (
    <div className="flex flex-col font-bold items-center py-60">
      <div className=" my-3 font-bold flex justify-center text-black">
        <Label htmlFor="profileIcon" className=" text-black mr-2">
          ユーザーアイコン
        </Label>
        {/* <UserIcon /> */}
      </div>
      <div className="my-10 w-[800px] py-5">
        <Label htmlFor="userName" className="text-gray-700 mr-2">
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
          label=" 自己紹介"
          placeholder="200文字以内"
          value={formState.biography}
          maxLength={200}
          name="biography"
          onChange={(e) => updateFormState("biography", e.target.value)}
          rows={15}
          col={80}
        />
      </div>
    </div>
  );
};
