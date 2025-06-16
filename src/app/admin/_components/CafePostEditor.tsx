"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/app/_components/Input";
import { CafeFormFields } from "../_data/cafeFormFields";
import { TextArea } from "@/app/_components/TextArea";
import { CafeFormStateReturn } from "../_types/CafeFormStateReturn";
import useSWR from "swr";
import api from "@/_utils/api";
import toast, { Toaster } from "react-hot-toast";
import "../../globals.css";

export const CafePostEditor: React.FC<CafeFormStateReturn> = ({
  onChange,
  clearForm,
}) => {
  const [clearSignal, setClearSignal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    storeAddress: "",
    businessHours: "",
    closingDays: "",
    cafeUrl: "",
    menuOrdered: "",
    comment: ""
  });
  const { id } = useParams();
  const fetcher = (url: string) => api.get(url);

  const { data: CafePostData } = useSWR(`/api/public/cafe_post/${id}/edit`,fetcher);

useEffect(() => {
  if(CafePostData?.data?.cafe) {
    setFormState(CafePostData.data.cafe);
  }
}, [CafePostData])
    
const handleUpdateCafePost = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  try {
    await api.put(`/api/public/cafe_post/${id}/edit`, formState);
    toast.success(CafePostData.message || "更新しました！");
  } catch (error) {
    console.log("更新失敗:", error);
    toast.error(error instanceof Error ? error.message : "更新失敗しました。もう一度お試しください！！");
  }
}
    
  return (
    <>
    </>
  )

};
