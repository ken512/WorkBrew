"use client";
import { useRouter } from "next/navigation";
import React from "react";

type ButtonProps = {
  href: string;
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  className: string;
};

export const LinkButton: React.FC<ButtonProps> = ({
  href,
  children,
  className,
  type,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };
  return (
    <button onClick={handleClick} type={type} className={className}>
      <span>{children}</span>
    </button>
  );
};
