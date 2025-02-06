"use client";
import React, { useState } from "react";
import { CafeFormStateProps } from "../_types/cafeFormStateProps";
import { UseCafeFormStateReturn } from "../_types/useCafeFormStateReturn";
export const UseCafeFormState = (): UseCafeFormStateReturn => {
  const cafeState:CafeFormStateProps = {
    cafeName: "",
    thumbnailImage: "",
    area: "",
    storeAddress: "",
    openingTime: "",
    closingHours: "",
    closingDays: "",
    cafeUrl: "",
    menuOrdered: "",
    wifiAvailable: false,
    wifiSpeed: false,
    wifiStability: false,
    powerOutlets: false,
    seatAvailability: false,
    starRating: null,
    comment: "",
    locationCoordinates: "",
  };

  const [formState, setFormState] = useState<CafeFormStateProps>(cafeState);

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

  

  return { formState, setFormState, onChange, clearForm };
};
