"use client";
import React from "react";
import Link from "next/link";

type NavLinkProps = {
  children: React.ReactNode;
  className: string;
  href: string;
};

export const NavLink:React.FC<NavLinkProps> = ({ children, className, href }) => {

  return (
    <Link href={href} className={className}>
    {children}
    </Link>
  )
}
