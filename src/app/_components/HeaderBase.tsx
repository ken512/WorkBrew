"use client";
import React from "react";
import Link from "next/link";

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
      className="font-pacifico text-3xl sm:text-lg py-4 text-black-500 hover:text-customOrange"
    >
      {children}
    </Link>
  );
};
