"use client";
import React from "react";
import "../globals.css";

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  variant?: "default" | "required" | "error";
};

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  variant = "default",
}) => {
  const baseStyles = "block text-xl font-bold mb-2 sm:text-sm";
  
  const variantStyles = {
    default: "text-black",
    required: "text-gray-700 after:content-['*'] after:text-red-500 after:ml-1",
    error: "text-red-500",
  };

  return (
    <label 
      htmlFor={htmlFor} 
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </label>
  );
};
