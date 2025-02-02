"use client";
import React, { FormEvent, useState } from "react";
import { HeaderAdminBase } from "../_components/HeaderAdminBase";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { UserAccountFormProps } from "../_types/UserAccountForm";
import { UserAccountForm } from "../_components/UserAccountForm";
import { Button } from "../_components/Button";
import { UserAccountErrorType } from "../_types/UserAccountErrorType";
import "./../../globals.css";

const UserAccount: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formState, setFormState] = useState<UserAccountFormProps>({
    userName: "",
    profileIcon: "",
    biography: "",
  });
  
  const [errors, setErrors] = useState<UserAccountErrorType>({});
  const { token } = useSupabaseSession();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const tempErrors:UserAccountErrorType = {};
    if (!formState.userName) tempErrors.userName = "※必須";
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      return;
    }

    try {
      const response = await fetch("/api/admin/user_account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify(formState),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      } else {
        alert("ユーザー登録完了しました！");
      }
    } catch (error) {
      console.log("ユーザー登録に失敗しました！", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <HeaderAdminBase href="/admin/home" />
      <div className="bg-tan-300">
        <form onSubmit={handleSubmit}>
        <UserAccountForm formState={formState} setFormState={setFormState} errors={errors}/>
        <div className="flex flex-col items-center">
          <Button
            type="submit"
            className=" my-10 py-3 px-[80px] bg-gray-300 rounded-3xl font-bold hover:bg-custom-green"
            onClick={handleSubmit}
          >
            保存
          </Button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default UserAccount;
