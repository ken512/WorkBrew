"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavLinkProps = {
  children: React.ReactNode;
  href: string;
};

export const NavLink: React.FC<NavLinkProps> = ({ children, href }) => {
  const pathname = usePathname();
  const isSelected = pathname.includes(href);

  return (
      <li>
        <Link
          href={href}
          className={`block w-60 px-2 py-1 text-gray-700 hover:bg-gray-100 ${
            isSelected ? "font-bold" : ""
          }`}
        >
          {children}
        </Link>
      </li>
  );
};
