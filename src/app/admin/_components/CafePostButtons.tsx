"use client";
import React, { useEffect, useState } from "react";
import { ButtonColorSwitching } from "./buttonColorSwitching";
import "../../globals.css";

type CafePostButtonsProps = {
  label: string; //フィールド名（例: Wi-Fiの有無）
  options: string[]; //ボタンの選択肢
  onSelect: (selected: string) => void; // 選択変更時のコールバック
  error?: string; // エラーメッセージ
  clearSignal?: boolean;  // クリアのシグナルを受け取るプロパティ
  disabled?: boolean;
};

export const CafePostButtons = ({
  label,
  options,
  onSelect,
  error,
  clearSignal = false,
  disabled = false, 

}: CafePostButtonsProps) => {
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (clearSignal) {
      setSelected({}); // clearSignalがtrueの場合、選択状態をリセット
    }
  }, [clearSignal]); // クリアシグナルが来たら選択状態をリセット

  const handleClick = (option: string | number) => {
    if(typeof option === "string") {
      setSelected((prevSelected) => ({
        ...prevSelected,
        [option]: !prevSelected[option],
      }));
      onSelect(option);
    } else {
      onSelect(option.toString());
    }
  };

  const getButtonClass = (option: string) => {
    const defaultClass = "px-4 py-2 rounded-2xl border bg-beige-200"; // 初期値のクラス
    const selectedClass = "text-black";

    const colorClass =
      {
        有: "bg-custom-red",
        無: "bg-custom-blue",
        高速: "bg-custom-green",
        中速: "bg-custom-orange",
        低速: "bg-custom-red",
        非常に安定: "bg-custom-green",
        安定: "bg-custom-blue",
        不安定: "bg-custom-red",
        空いている: "bg-custom-green",
        混雑中: "bg-custom-orange",
        満席: "bg-custom-red",
      }[option] || "";

    return `${defaultClass} ${
      selected[option] ? `${colorClass} ${selectedClass}` : defaultClass
    }`;
  };

  const isStarRating = label === "おすすめ度";

  return (
    <div className="mb-6">
      <label className="block text-lg font-bold mb-2 ">
        {label}{error && <span className="text-red-500 ml-2">{error}</span>}
      </label>
      <div className="flex gap-3 font-bold">
        {isStarRating ? (
          <ButtonColorSwitching
            isStarRating={true}
            clearSignal={clearSignal}
            onClick={(rating) => rating !== undefined && handleClick(rating)}
          />
        ) : (
          options.map((option) => (
            <ButtonColorSwitching
              key={option}
              type="button"
              className={getButtonClass(option)}
              onClick={() => handleClick(option)}
              disabled={disabled} 
            >
              {option}
            </ButtonColorSwitching>
          ))
        )}
      </div>
    </div>
  );
};
