"use client";
import React from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  className: string;
  children: React.ReactNode;
  onClick?: (e: React.FormEvent) => void;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  className,
  children,
  onClick,
}) => {

  
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};
