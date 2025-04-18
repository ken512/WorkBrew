"use client";
import { useRouter } from "next/navigation";
import React from "react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className: string;
};

export const LinkButton: React.FC<ButtonProps> = ({
  href,
  children,
  className,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };
  return (
    <button onClick={handleClick} className={className}>
      <span>{children}</span>
    </button>
  );
};
