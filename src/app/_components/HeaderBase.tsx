"use client";
import React from "react";
import Link from "next/link";

type HeaderProps = {
  href: string;
  variant?: "default" | "admin" | "user";
  children: React.ReactNode;
};

export const HeaderBase: React.FC<HeaderProps> = ({
  href,
  variant = "default",
  children,
}) => {
  const baseStyles = "flex items-center justify-center py-4 px-6";
  
  const variantStyles = {
    default: "bg-beige-200 hover:bg-custom-green",
    admin: "bg-tan-300 hover:bg-custom-green",
    user: "bg-gray-100 hover:bg-gray-200"
  };

  return (
    <Link 
      href={href} 
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </Link>
  );
};
