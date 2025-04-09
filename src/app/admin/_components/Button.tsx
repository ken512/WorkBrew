"use client";
import React from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  onClick?: (e: React.FormEvent) => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  children,
  variant = "primary",
  disabled = false,
}) => {
  const baseStyles = "px-6 py-2 min-w-[80px] sm:text-sm rounded-3xl font-bold transition-colors duration-200";
  
  const variantStyles = {
    primary: "bg-beige-200 hover:bg-custom-green",
    secondary: "bg-custom-blue hover:bg-custom-green",
    danger: "bg-custom-red hover:bg-custom-green"
  };

  const handleClick = (e: React.FormEvent) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
};
