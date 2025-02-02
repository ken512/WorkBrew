"use client";
import React, { useState, FormEvent } from "react";
import { HeaderAdminBase } from "../_components/HeaderAdminBase";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { CafePostForm } from "../_components/CafePostForm";
// import { ThumbnailHandle } from "../_components/ThumbnailHandle";
import { useCafeFormState } from "../_components/cafeFormState";
import "../../globals.css";

const CafeSubmissionForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { token } = useSupabaseSession();
  const { formState, setFormState, handleChange, clearForm} = useCafeFormState();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

      try {
        const response = await fetch("/api/admin/cafe_submission_form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:  token!,
          },
          body: JSON.stringify(formState),
        });
        console.log("Form State at Submission:", formState);
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response:", errorData);
        } else {
          alert("カフェ投稿しました！");
          clearForm(); // フォームをリセット
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
      <div className="bg-tan-300" onClick={handleSubmit}>
        {/* <ThumbnailHandle /> */}
        <CafePostForm formState={formState} setFormState={setFormState} clearForm={clearForm} handleChange={handleChange}/>
      </div>
    </div>
  );
};

export default CafeSubmissionForm;
