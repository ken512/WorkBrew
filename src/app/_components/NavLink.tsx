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
<<<<<<< HEAD
          className={`block w-60 sm:w-[150px] px-2 py-1 text-gray-700 hover:bg-gray-100 ${
=======
          className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
>>>>>>> parent of bed149f (Merge pull request #3 from ken512/feature/user_account)
            isSelected ? "font-bold" : ""
          }`}
        >
          {children}
        </Link>
      </li>
  );
};
