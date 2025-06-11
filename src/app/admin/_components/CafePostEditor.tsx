"use client";
import React, { useState } from "react";
import { Input } from "@/app/_components/Input";
import { CafeFormFields } from "../_data/cafeFormFields";
import { TextArea } from "@/app/_components/TextArea";
import { CafeFormStateReturn } from "../_types/CafeFormStateReturn";
import useSWR from "swr";
import api from "@/_utils/api";
import toast, { Toaster } from "react-hot-toast";
import "../../globals.css";


export const CafePostEditor: React.FC<CafeFormStateReturn> = ({
  formState,
  setFormState,
  onChange,
  clearForm,
}) => {
  const [clearSignal, setClearSignal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


}