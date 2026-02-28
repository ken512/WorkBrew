"use client";
import React, { useState } from "react";
import { CafeFormStateProps } from "../_types/CafeFormStateProps";
import { CafeFormStateReturn } from "../_types/CafeFormStateReturn";
import { useNearbySearchParams } from "../cafe_submission_form/hooks/useNearbySearchParams";
import { useCurrentLocation } from "../cafe_submission_form/hooks/useCurrentLocation";
export const UseCafeFormState = (): CafeFormStateReturn => {
  const cafeState: CafeFormStateProps = {
    cafeName: "",
    thumbnailImage: "",
    area: "",
    storeAddress: "",
    businessHours: "",
    closingDays: "",
    cafeUrl: "",
    menuOrdered: "",
    wifiAvailable: null,
    wifiSpeed: null,
    wifiStability: null,
    powerOutlets: null,
    seatAvailability: null,
    starRating: 0,
    comment: "",
    locationCoordinates: "",
    
  };

  const [formState, setFormState] = useState<CafeFormStateProps>(cafeState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {location} = useCurrentLocation();
  const nearby = useNearbySearchParams(location);
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
    nearby,
  };
};
