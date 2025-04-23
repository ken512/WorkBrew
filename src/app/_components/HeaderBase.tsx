"use client";
import React from "react";
import Link from "next/link";
import "../globals.css";

type HeaderProps = {
  href: string;
  children: React.ReactNode;
};

export const HeaderBase: React.FC<HeaderProps> = ({
  href,
  children,
}) => {

  return (
    <Link 
      href={href}
      className="text-2xl sm:text-lg py-4 text-black-500 hover:text-customOrange"
    >
      {children}
    </Link>
  );
};
