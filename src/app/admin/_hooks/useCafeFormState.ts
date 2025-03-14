"use client";
import React, { useState } from "react";
import { CafeFormStateProps } from "../_types/cafeFormStateProps";
import { UseCafeFormStateReturn } from "../_types/cafeFormStateReturn";
export const UseCafeFormState = (): UseCafeFormStateReturn => {
  const cafeState: CafeFormStateProps = {
    cafeName: "",
    thumbnailImage: "",
    area: "",
    storeAddress: "",
    businessHours: "",
    closingDays: "",
    cafeUrl: "",
    menuOrdered: "",
    wifiAvailable: false,
    wifiSpeed: null,
    wifiStability: null,
    powerOutlets: false,
    seatAvailability: null,
    starRating: 0,
    comment: "",
    locationCoordinates: "",
  };

  const [formState, setFormState] = useState<CafeFormStateProps>(cafeState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    
  };

  const clearForm = () => {
    // フォームのすべての状態をリセット
    setFormState(cafeState);
    console.log("Form state after clear:", cafeState); // 初期化後の状態を確認
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return {
    formState,
    onSubmit,
    setFormState,
    onChange,
    clearForm,
    isSubmitting,
    setIsSubmitting,
  };
};
