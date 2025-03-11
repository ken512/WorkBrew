"use client";
import React, { FormEvent, useState } from "react";
import { HeaderAdminBase } from "../_components/headerAdminBase";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { UserAccountFormProps } from "../_types/userAccountForm";
import { UserAccountForm } from "../_components/userAccountForm";
import { UserAccountErrorType } from "../_types/userAccountErrorType";
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

    // バリデーションチェック
    const tempErrors: UserAccountErrorType = {};
    if (!formState.userName) tempErrors.userName = "※必須";
    setErrors(tempErrors);

    // エラーがある場合は処理を中断
    if (Object.keys(tempErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch("/api/admin/user_account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          alert(data.message || "このユーザーは既に登録されています");
        } else {
          throw new Error(data.message || "ユーザー登録に失敗しました");
        }
        return;
      }

      console.log("User created successfully:", data);
      alert(data.message || "ユーザー登録が完了しました！");
      // 成功時の追加処理（例：ホームページへのリダイレクトなど）
    } catch (error) {
      console.error("ユーザー登録エラー:", error);
      alert(error instanceof Error ? error.message : "ユーザー登録に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async(e:FormEvent) => {
    e.preventDefault();
    if(isSubmitting) return;
    setIsSubmitting(true);
    // バリデーションチェック
    const tempErrors: UserAccountErrorType = {};
    if (!formState.userName) tempErrors.userName = "※必須";
    setErrors(tempErrors);

    // エラーがある場合は処理を中断
    if (Object.keys(tempErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch("/api/admin/user_account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "ユーザー情報を更新しました");
      } else {
        throw new Error(data.message || "更新に失敗しました");
      }
    } catch (error) {
      console.error("更新エラー:", error);
      alert(error instanceof Error ? error.message : "更新に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <HeaderAdminBase href="/admin/home" />
      <div className="bg-tan-300">
        <form>
          <UserAccountForm 
            formState={formState} 
            setFormState={setFormState} 
            errors={errors}
            onSubmit={handleSubmit}
            onUpdate={handleUpdate}
          />
        </form>
      </div>
    </div>
  );
};

export default UserAccount;
