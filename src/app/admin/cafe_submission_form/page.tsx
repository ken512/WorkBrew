"use client";
import React, { useState, FormEvent } from "react";
import { HeaderAdminBase } from "../_components/headerAdminBase";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { CafePostForm } from "../_components/cafePostForm";
import { ThumbnailHandle } from "../_components/thumbnailHandle";
import { UseCafeFormState } from "../_hooks/cafeFormState";
import "../../globals.css";

const CafeSubmissionForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { token } = useSupabaseSession();
  const { formState, setFormState, clearForm} = UseCafeFormState();

  const handleImageUpload = (imageUrl: string) => {
    setFormState(prev => ({
      ...prev,
      thumbnailImage: imageUrl
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/cafe_submission_form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token!,
        },
        body: JSON.stringify(formState),
      });
      console.log("Form State at Submission:", formState);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
      } else {
        alert("カフェ投稿しました！");
        clearForm();
      }
    } catch (error) {
      console.error("投稿に失敗しました!:", error);
    } finally {
      setIsSubmitting(false);
    }   
  };

  return (
    <div>
      <HeaderAdminBase href="/admin/home" />
      <div className="bg-tan-300">
        <ThumbnailHandle 
          onImageUpload={handleImageUpload}
          initialImage={formState.thumbnailImage}
        />
        <CafePostForm 
          formState={formState} 
          setFormState={setFormState} 
          clearForm={clearForm} 
          onChange={handleSubmit}
        />
        <div className="flex justify-center pb-10">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-beige-200 rounded-3xl font-bold hover:bg-custom-green"
            disabled={isSubmitting}
          >
            {isSubmitting ? "投稿中..." : "投稿する"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CafeSubmissionForm;
