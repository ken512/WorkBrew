"use client";
import React from "react";
import Link from "next/link";
type HeaderProps = {
  href: string;
<<<<<<< HEAD
=======
  className: string;
>>>>>>> parent of bed149f (Merge pull request #3 from ken512/feature/user_account)
  children: React.ReactNode;
};

export const HeaderBase: React.FC<HeaderProps> = ({
  href,
<<<<<<< HEAD
=======
  className,
>>>>>>> parent of bed149f (Merge pull request #3 from ken512/feature/user_account)
  children,
}) => {

  return (
<<<<<<< HEAD
    <Link 
      href={href}
      className="font-pacifico text-3xl sm:text-lg py-4 text-black-500 hover:text-customOrange"
    >
      {children}
    </Link>
=======

      <Link href={href} className={className}>
        {children}
      </Link>
>>>>>>> parent of bed149f (Merge pull request #3 from ken512/feature/user_account)
  );
};
