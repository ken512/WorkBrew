"use client";
import React, { useState } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
  onClick?: (index?: number) => void;
  isStarRating?: boolean; // 星評価として使用するかどうか
  initialRating?: number; // 初期評価の星の数
};

export const ButtonColorSwitching: React.FC<ButtonProps> = ({
  type,
  className,
  children,
  isStarRating = false,
  initialRating = 3,
  onClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [rating, setRating] = useState(initialRating);

  const handleClick = (index?: number) => {
    if(isStarRating && index !== undefined) {
     // クリックされた星が選択されている場合はその星の選択を解除
    const newRating = index + 1 === rating ? index : index + 1;
    setRating(newRating);
    onClick?.(newRating);
    } else {
      setIsClicked(!isClicked);
      onClick?.();
    }
  };

  if (isStarRating) {
    {/*星評価 */}
    return (
      <div className="flex space-x-1">
        {Array.from({ length: 3 }, (_, index) => (
          <span
            key={index}
            onClick={() => handleClick(index)}
            className={`cursor-pointer text-2xl ${
              index < rating ? "text-white" : "text-custom-red"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  }
{/*通常のボタン */}
  return (
    <button
      type={type}
      className={`${className} ${isClicked ? className : ""}`}
      onClick={() => handleClick()}
    >
      {children}
    </button>
  );
};
