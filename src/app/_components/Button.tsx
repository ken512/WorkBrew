"use client";
import React from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  className: string;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  className,
  children,
}) => {
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
};
