"use client";
import React from "react";
import Link from "next/link";
import "../globals.css";

type LinkButtonProps = {
  href: string;
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  type,
  children,
  variant = "primary"
}) => {
  const baseStyles = "px-4 py-2 rounded-3xl font-bold transition-colors duration-200 mx-2";
  
  const variantStyles = {
    primary: "bg-beige-200 hover:bg-custom-green text-black",
    secondary: "bg-gray-200 hover:bg-gray-300 text-black",
    outline: "border-2 border-beige-200 hover:bg-beige-200 text-black"
  };

  return (
    <Link 
      href={href}
      type={type}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </Link>
  );
};
