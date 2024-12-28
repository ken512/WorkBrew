"use client";
import React from "react";
import Link from "next/link";

type ButtonProps = {
  href: string;
  type: string;
  children: string;
  className: string;
};

export const Button: React.FC<ButtonProps> = ({ href, type, children, className }) => {

  return (
    <button className={className}>
    <Link href={href} type={type}>
    {children}
    </Link>
    </button>
  )
}
