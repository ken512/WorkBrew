"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/app/_components/Input";
import { CafeFormFields } from "../_data/cafeFormFields";
import { TextArea } from "@/app/_components/TextArea";
import { PostClearButton } from "./PostClearButton";
import { CafeFormStateReturn } from "../_types/CafeFormStateReturn";
import useSWR from "swr";
import api from "@/_utils/api";
import toast, { Toaster } from "react-hot-toast";
import "../../globals.css";

export const CafePostEditor: React.FC<CafeFormStateReturn> = ({
  onChange,
  clearForm,
}) => {
  const [, setClearSignal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    storeAddress: "",
    businessHours: "",
    closingDays: "",
    cafeUrl: "",
    menuOrdered: "",
    comment: "",
  });
  const { id } = useParams();
  const router = useRouter();
  const fetcher = (url: string) => api.get(url);

  const { data: CafePostData } = useSWR(
    `/api/public/cafe_post/${id}/edit`,
    fetcher
  );
  const cafe = data.cafes;

  const handleBack = () => {
    router.push(`/cafe_post/${cafe.id}`)
  }

  useEffect(() => {
    if (CafePostData?.data?.cafe) {
      setFormState(CafePostData.data.cafe);
    }
  }, [CafePostData]);

  const handleUpdateCafePost = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await api.put(`/api/public/cafe_post/${id}/edit`, formState);
      toast.success(data.message || "更新しました！");
    } catch (error) {
      console.log("更新失敗:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "更新失敗しました。もう一度お試しください！！"
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleClear = () => {
    clearForm();
    setClearSignal(true);
    setTimeout(() => setClearSignal(false), 0);
  };


  return (
    <div className="flex flex-col items-center py-40 sm:px-4 sm:text-sm">
      <button>
          <a
            className="absolute right-4  px-5 py-2 mt-[70px] rounded-full text-black bg-custom-red hover:bg-custom-green "
            onClick={handleBack}
          >
            戻る
          </a>
        </button>
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleUpdateCafePost}
        className="sm:w-full sm:max-w-[350px]"
      >
        {CafeFormFields.map(({ name, label, placeholder, required }) => (
          <div key={name} className="py-2 font-bold w-[700px] sm:w-full">
            <label className="text-gray-700 mr-2">{label}</label>
            <Input
              type="text"
              name={name}
              id={name}
              value={String(formState[name as keyof typeof formState] ?? "")}
              placeholder={placeholder}
              onChange={onChange}
              required={required}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-5"
            />
          </div>
        ))}
        <div className="mt-10 sm:text-sm sm:p-5 sm:max-w-[350px] ">
          <TextArea
            label="コメント欄（カフェの感想やおすすめポイントを記入してください）"
            placeholder="500文字以内"
            value={formState.comment}
            maxLength={500}
            name="comment"
            onChange={onChange}
            rows={15}
            col={80}
          />
        </div>
        <PostClearButton
          onSubmit={handleUpdateCafePost}
          onClear={handleClear}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};
