"use client";
import React, {useState} from "react";

import { HeaderAdminBase } from "@/app/admin/_components/HeaderAdminBase";
import { CafePostEditor } from "@/app/admin/_components/CafePostEditor";
import { UseCafeFormState } from "@/app/admin/_hooks/useCafeFormState";
import "../../../globals.css";

const EditCafePostPage: React.FC = () => {
  const {formState, setFormState, clearForm } = UseCafeFormState();
  const [isSubmitting , setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value} = e.target;
    setFormState((prev: typeof formState) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div>
      <HeaderAdminBase href="/admin/home" />
      <div className="bg-tan-300">
        <h1 className="flex justify-center font-bold text-3xl pt-[100px]">カフェ編集</h1>
      <CafePostEditor
        formState={formState}
        setFormState={setFormState}
        onChange={handleChange}
        clearForm={clearForm}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />
      </div>
    </div>
  )

}

export default EditCafePostPage;