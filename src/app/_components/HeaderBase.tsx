"use client";
import React from "react";
import Link from "next/link";
type HeaderProps = {
  href: string;
  className: string;
  children: string;
};

export const HeaderBase: React.FC<HeaderProps> = ({
  href,
  className,
  children,
}) => {
  return (
    <header className={className}>
      <Link href={href} className={className}>
        {children}
      </Link>
    </header>
  );
};
