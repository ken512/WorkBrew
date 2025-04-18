"use client";
import React from 'react';

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className: string;
};

<<<<<<< HEAD
export const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  variant = "default",
}) => {
  const baseStyles = "block text-xl font-bold mb-2 sm:text-sm";
  
  const variantStyles = {
    default: "text-black",
    required: "text-gray-700 after:content-['*'] after:text-red-500 after:ml-1",
    error: "text-red-500",
  };
=======
export const Label: React.FC<LabelProps> = ({htmlFor, children, className}) => {
>>>>>>> parent of bed149f (Merge pull request #3 from ken512/feature/user_account)

  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  )
  
}