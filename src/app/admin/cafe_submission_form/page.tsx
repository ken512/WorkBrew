"use client";
import React, { useState, FormEvent } from "react";
import { HeaderAdminBase } from "../_components/headerAdminBase";
import { CafePostForm } from "../_components/cafePostForm";
import { ThumbnailHandle } from "../_components/thumbnailHandle";
import { UseCafeFormState } from "../_hooks/cafeFormState";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import "../../globals.css";

const CafeSubmissionForm: React.FC = () => {
  const { token } = useSupabaseSession();
  const { formState, setFormState, clearForm } = UseCafeFormState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setFormState((prev) => ({
      ...prev,
      thumbnailImage: imageUrl,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    console.log("送信データ:", formState);
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/cafe_submission_form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formState),
      });
      const data = await response.json();
      console.log("API Response:", data);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert("投稿に失敗しました");
      } else {
        alert("カフェ投稿しました！");
        clearForm();
      }
    } catch (error) {
      console.error("投稿に失敗しました:", error);
    } finally {
      setIsSubmitting(false);
    }

  };

  console.log(formState);
  return (
    <div>
      <HeaderAdminBase href="/admin/home" />
      <div className="bg-tan-300">
      <form onSubmit={handleSubmit}>
        <ThumbnailHandle
          onImageUpload={handleImageUpload}
          initialImage={formState.thumbnailImage}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
        <CafePostForm
          formState={formState}
          onSubmit={handleSubmit}
          setFormState={setFormState}
          onChange={handleChange}
          clearForm={clearForm}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
        </form>
      </div>
    </div>
  );
};

export default CafeSubmissionForm;
