"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Input } from "@/app/_components/Input";
import { CafeFormFields } from "../_data/cafeFormFields";
import { CafePostButtons } from "./CafePostButtons";
import { ButtonFields } from "../_data/ButtonFields";
import { PostClearButton } from "./PostClearButton";
import { TextArea } from "@/app/_components/TextArea";
import { FormErrorsType } from "@/_types/FormErrorsType";
import { UseCafeFormStateReturn } from "../_types/UseCafeFormStateReturn";
import "../../globals.css";

export const CafePostForm: React.FC<UseCafeFormStateReturn> = ({formState,
  setFormState,
  handleChange,
  clearForm,}) => {
  const { token } = useSupabaseSession();
  const [errors, setErrors] = useState<FormErrorsType>({});

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/cafe_submission_form", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          
        });
        console.log("Token:", token);
        if (!response.ok) {
          throw new Error("Failed to fetch cafePost");
        }
      } catch (error) {
        console.log("Failed to fetch cafePost:", error);
      }
    };
    fetchData();
  }, [token]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    validateForm();
  };

  const convertSelection = (option: string, fieldName: string): boolean | number => {
    console.log(option, fieldName); // デバッグ用ログ
    switch (fieldName) {
      case "wifiAvailable":
      case "powerOutlets":
        return option === "有"; // "有"をtrueに変換、"無"をfalseに変換
      case "wifiSpeed":
        return option === "高速"; // 例: "高速"をtrue、それ以外をfalseに変換
      case "wifiStability":
        return option === "非常に安定"; // 例: "非常に安定"をtrue、それ以外をfalseに変換
      case "seatAvailability":
        return option === "空いている"; // 例: "空いている"をtrue、それ以外をfalseに変換
      case "starRating":
        return parseInt(option); // 数値に変換
      default:
        return false; // デフォルトでfalseを返す
    }
  };

  const validateForm = async () => {
    const tempErrors: FormErrorsType = {};
    if (!formState.cafeName) tempErrors.cafeName = "※必須";
    if (!formState.storeAddress) tempErrors.storeAddress = "※必須";
    if (!formState.wifiAvailable) tempErrors.wifiAvailable = "※必須";
    if (!formState.powerOutlets) tempErrors.powerOutlets = "※必須";
    if (!formState.seatAvailability) tempErrors.seatAvailability = "※必須";
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      return;
    }
  };

  const handleClear = () => {
    clearForm(); // 全フィールドを初期化
  };

  // URLのリンク生成
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
      <div className="flex flex-col items-center py-60">
        <form onSubmit={handleSubmit}>
          {/* テキスト入力フィールド */}
          {CafeFormFields.map(({ name, label, placeholder, required }) => (
            <div key={name} className=" py-2 font-bold w-[600px] ">
              <div className="flex items-center mb-2">
                <label className="text-gray-700 mr-2">{label}</label>
                {errors[name] && (
                  <p className="text-red-500 text-sm">{errors[name]}</p>
                )}
              </div>
              <Input
                type="text"
                name={name}
                id={name}
                value={
                  (formState[name as keyof typeof formState] as string) || ""
                }
                placeholder={placeholder}
                onChange={handleChange}
                required={required}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-5"
              />
            </div>
          ))}

          {formState.cafeUrl && isValidUrl(formState.cafeUrl) && (
            <a
              href={formState.cafeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              カフェのウェブサイト
            </a>
          )}
          {/* ボタン選択フィールド */}
          <div className="mt-10">
          {ButtonFields.map(({ label, options, fieldName }) => (
            <CafePostButtons
              key={fieldName}
              label={label}
              options={options}
              error={errors[fieldName]}
              onSelect={(selected) => {
                const convertedValue = convertSelection(selected, fieldName);
                setFormState((prevState) => ({
                  ...prevState,
                  [fieldName]: convertedValue,
                }));
              }}
            />
          ))}
        </div>
          <div className="mt-10">
            <TextArea
              label="コメント欄（カフェの感想やおすすめポイントを記入してください）"
              placeholder="200文字以内"
              value={formState.comment}
              maxLength={200}
              name="comment"
              onChange={handleChange}
              rows={15}
              col={80}
            />
          </div>
        <PostClearButton ClickPost={handleSubmit} ClickClear={handleClear} />
        </form>
      </div>
  );
};
