"use client";
import React from "react";
import Link from "next/link";
type HeaderProps = {
  href: string;
  className: string;
  children: React.ReactNode;
};

export const HeaderBase: React.FC<HeaderProps> = ({
  href,
  className,
  children,
}) => {

  return (

      <Link href={href} className={className}>
        {children}
      </Link>
  );
};
