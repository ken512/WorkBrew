"use client";
import React, { FormEvent, useState } from "react";
import { HeaderAdminBase } from "../_components/HeaderAdminBase";
import { UserAccountFormProps } from "../_types/UserAccountForm";
import { UserAccountForm } from "../_components/UserAccountForm";
import { UserAccountErrorType } from "../_types/UserAccountErrorType";
import api from "@/_utils/api";
import { FooterDefault } from "@/app/_components/Footer/FooterDefault";
import toast, { Toaster } from "react-hot-toast";
import "./../../globals.css";

const UserAccount: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formState, setFormState] = useState<UserAccountFormProps>({
    userName: "",
    profileIcon: "",
    biography: "",
  });

  const [errors, setErrors] = useState<UserAccountErrorType>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const tempErrors: UserAccountErrorType = {};
    if (!formState.userName) tempErrors.userName = "※必須";
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      const data = await api.post("/api/admin/user_account", formState);
      toast.success(data.message || "ユーザー登録が完了しました！");
    } catch (error) {
      console.error("ユーザー登録エラー:", error);
      toast.error(error instanceof Error ? error.message : "ユーザー登録に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const tempErrors: UserAccountErrorType = {};
    if (!formState.userName) tempErrors.userName = "※必須";
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      const data = await api.put("/api/admin/user_account", formState);
      toast.success(data.message || "ユーザー情報を更新しました");
    } catch (error) {
      console.error("更新エラー:", error);
      toast.error(error instanceof Error ? error.message : "更新に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <HeaderAdminBase href="/admin/home" />
      <div className="bg-tan-300 min-h-screen flex flex-col grid-flow-row items-center justify-center mx-0">
        <Toaster position="top-center" reverseOrder={false} />
        <form>
          <UserAccountForm
            formState={formState}
            setFormState={setFormState}
            errors={errors}
            onSubmit={handleSubmit}
            onUpdate={handleUpdate}
          />
        </form>
        <FooterDefault />
      </div>
    </div>
  );
};

export default UserAccount;
