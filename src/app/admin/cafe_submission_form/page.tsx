"use client";
import React, { useState } from "react";
import { HeaderAdminBase } from "../_components/HeaderAdminBase";
import { CafePostForm } from "../_components/CafePostForm";
import { ThumbnailHandle } from "../_components/ThumbnailHandle";
import { UseCafeFormState } from "../_hooks/useCafeFormState";
import "../../globals.css";

const CafeSubmissionForm: React.FC = () => {
  const { formState, setFormState, clearForm } = UseCafeFormState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setFormState((prev: typeof formState) => ({
      ...prev,
      thumbnailImage: imageUrl,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev: typeof formState) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  console.log(formState);
  return (
    <div>
      <HeaderAdminBase href="/admin/home" />
      <div className="bg-tan-300">
        <ThumbnailHandle
          onImageUpload={handleImageUpload}
          initialImage={formState.thumbnailImage}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
        <CafePostForm
          formState={formState}
          setFormState={setFormState}
          onChange={handleChange}
          clearForm={clearForm}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </div>
    </div>
  );
};

export default CafeSubmissionForm;
